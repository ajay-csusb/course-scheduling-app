import { BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';
import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import { getWebDxAccessToken } from './Utils';

export async function fetchCourseleafData(): Promise<any> {
  let courseleafData: [] = [];
  const accessToken = await getWebDxAccessToken();
  const axiosOptions: AxiosRequestConfig = {
    baseURL: app.settings.webdxSsoBaseUrl,
    url: 'OD/rest/v1/getProgramData',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
  console.log('Fetching Courseleaf data...');
  return axios(axiosOptions)
    .then((response: object) => {
      courseleafData = Object.values(response).pop();
      console.log('Processing Courseleaf data...');
      return processCourseleafData(courseleafData);
    })
    .catch((error: Error) => {
      console.log('Error fetching Courseleaf data: ');
      console.log({ error });
    });
}

function processCourseleafData(courseleafData: any) {
  let result: object[] = [];
  courseleafData.forEach((element: any) => {
    element.acadLevel = element.acadlevel;
    element.contactEmail = element.contact_email;
    element.contactPhone = element.contact_phone;
    element.overviewGrad = element.overview_grad;
    element.timestamp = new BigQueryTimestamp(new Date()).value;
    delete element.acadlevel;
    delete element.contact_email;
    delete element.contact_phone;
    delete element.overview_grad;
    result.push(element);
  });
  return result;
}
