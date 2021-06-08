import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';
import { removeHtmlTags } from '../lib/Utils';
import he from 'he';

export async function fetchEvents(): Promise<any> {
  let events: [] = [];
  const url =
    process.env && process.env.NODE_ENV === 'production' ? app.settings.getBaseUrl.live : app.settings.getBaseUrl.dev;
  const axiosOptions: AxiosRequestConfig = {
    baseURL: url,
    url: '/events?_format=json',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    auth: {
      username: process.env.DRUPAL_USERNAME ?? '',
      password: process.env.DRUPAL_PASSWORD ?? '',
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
    event['title'] = he.decode(event['title'].trim());
    event['description'] = he.decode(removeHtmlTags(event['description'].trim()));
    event['timestamp'] = new BigQueryTimestamp(new Date()).value;
    eventsData.push(event);
  });
  return eventsData;
}
