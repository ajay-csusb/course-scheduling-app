import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';

export async function fetchEvents(): Promise<any> {
  let events: [] = [];
  const url =
    process.env && process.env.NODE_ENV === 'production'
      ? app.settings.getEventsUrl.live
      : app.settings.getEventsUrl.dev;
  const axiosOptions: AxiosRequestConfig = {
    baseURL: url,
    url: '/events?_format=json',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  console.log('Fetching events...');
  return axios(axiosOptions)
    .then((response: object) => {
      console.log('Processing events...');
      events = Object.values(response).pop();
      return processEventsData(events);
    })
    .catch((error: Error) => {
      console.log('Error fetching event information');
      console.log({ error });
    });
}

function processEventsData(events: []): any {
  let eventsData: any[] = [];
  events.forEach((event: object) => {
    event['timestamp'] = new BigQueryTimestamp(new Date()).value;
    eventsData.push(event);
  });
  return eventsData;
}
