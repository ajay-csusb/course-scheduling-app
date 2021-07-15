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
  let startDate, endDate;
  [startDate, endDate] = event.date.split(' : ');
  event['start_date'] = new BigQueryDatetime(startDate.trim()).value;
  event['end_date'] = endDate === undefined ? event['start_date'] : new BigQueryDatetime(endDate.trim()).value;
  event['timestamp'] = new BigQueryTimestamp(new Date()).value;
  delete event['date'];
}

function updateTitle(event: any): void {
  let startDate, rest;
  [startDate, ...rest] = event.date.split(' : ');
  const year = new Date(startDate.trim()).getFullYear();
  const title = decode(event['title'].trim());
  event['title'] = `${title} ${year}`;
}
