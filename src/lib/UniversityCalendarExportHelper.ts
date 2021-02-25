import { BigQueryDatetime } from '@google-cloud/bigquery/build/src/bigquery';
import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { getBigQueryConnection } from './BigQueryHelper';

export async function fetchUniversityCalendarData(): Promise<any> {
  let universityCalendarData: [] = [];
  const url =
    process.env && process.env.NODE_ENV === 'production'
      ? app.settings.getBaseUrl.live
      : app.settings.getBaseUrl.dev;
  const axiosOptions: AxiosRequestConfig = {
    baseURL: url,
    url: '/university-calendar-export?_format=json',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
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
    updateDates(event);
    universityCalendarData.push(event);
  });
  return universityCalendarData;
}

function getCurrentTime(): any {
  const bigqueryClient = getBigQueryConnection()
  return bigqueryClient.datetime({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  }).value;
}

function updateDates(event: any) {
  event['timestamp'] = new BigQueryDatetime(getCurrentTime()).value;
  let start_date, end_date;
  [start_date, end_date] = event.date.split(" : ");
  event['start_date'] = new BigQueryDatetime(start_date.trim()).value;
  event['end_date'] = end_date === undefined ? event['start_date'] : new BigQueryDatetime(end_date.trim()).value;
  delete event['date'];
}