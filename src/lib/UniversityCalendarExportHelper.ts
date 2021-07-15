import { BigQueryDatetime, BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';
import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { decode } from 'he';

export async function fetchUniversityCalendarData(): Promise<any> {
  let universityCalendarData: [] = [];
  const url =
    process.env && process.env.NODE_ENV === 'production' ? app.settings.getBaseUrl.live : app.settings.getBaseUrl.dev;
  const axiosOptions: AxiosRequestConfig = {
    baseURL: url,
    url: '/university-calendar-export?_format=json',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    auth: {
      username: process.env.DRUPAL_USERNAME ?? '',
      password: process.env.DRUPAL_PASSWORD ?? '',
    },
  };
  console.log('Fetching university calendar data...');
  return axios(axiosOptions)
    .then((response: object) => {
      console.log('Processing university calendar data...');
      universityCalendarData = Object.values(response).pop();
      return processUniversityCalendarData(universityCalendarData);
    })
    .catch((error: Error) => {
      console.log('Error fetching university calendar data information');
      console.log({ error });
    });
}

function processUniversityCalendarData(data: []): any {
  let universityCalendarData: any[] = [];
  data.forEach((event: any) => {
    updateTitle(event);
    updateDates(event);
    universityCalendarData.push(event);
  });
  return universityCalendarData;
}

function updateDates(event: any): void {
  let startDateTime, endDateTime;
  [startDateTime, endDateTime] = event.date.split(' : ');
  const startDate = startDateTime.trim().split(' ')[0].split("-")
  event['start_date'] = new BigQueryDatetime(startDateTime.trim());
  event['end_date'] = endDateTime === undefined ? event['start_date'] : new BigQueryDatetime(endDateTime.trim());
  event['timestamp'] = new BigQueryTimestamp(new Date());
  event['date'] = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
}

function updateTitle(event: any): void {
  let startDate, rest;
  [startDate, ...rest] = event.date.split(' : ');
  const year = new Date(startDate.trim()).getFullYear();
  const title = decode(event['title'].trim());
  event['title'] = `${title} ${year}`;
}
