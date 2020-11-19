import { getWebDxAccessToken } from '../lib/Utils';
import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { IPeopleTableInterface, People } from './People';
import { BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';

export async function fetchPeople(): Promise<any> {
  let people: [] = [];
  const accessToken = await getWebDxAccessToken();
  const axiosOptions: AxiosRequestConfig = {
    baseURL: app.settings.webdx.departmentPeople.baseUrl,
    url: '/OnlineDirectory/v2/api/getAllPeople',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
  return axios(axiosOptions)
    .then((response: object) => {
      people = Object.values(response).pop();
      return processPeopleData(people);
    })
    .catch((error: Error) => {
      console.log('Error fetching people information');
      console.log({ error });
    });
}

function processPeopleData(persons: []): IPeopleTableInterface[] {
  let peopleData: IPeopleTableInterface[] = [];
  persons.forEach((person: object) => {
    const people: People = new People(person);
    sanitizePhoneNumber(people);
    const peopleRow: IPeopleTableInterface = addTimestamp(people);
    peopleData.push(peopleRow);
  });
  return peopleData;
}

function sanitizePhoneNumber(people: People): void {
  people.pubExt = people.pubExt.replace(': ', '').trim();
}

function addTimestamp(people: People): IPeopleTableInterface {
  const peopleRow: IPeopleTableInterface = people as IPeopleTableInterface;
  peopleRow.timestamp = new BigQueryTimestamp(new Date()).value;
  return peopleRow;
}
