import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { app } from '../public/js/ClassSearch.d';

export function loadEnvironmentVariables(): void {
  if (process.env && process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
  }
  dotenv.config({ path: '.env.dev' });
}

export function getWebDxAccessToken(): Promise<any> {
  const axiosOptions: AxiosRequestConfig = {
    baseURL: app.settings.webdx.departmentPeople.baseUrl,
    url: '/AuthTokenService/oauth/token',
    method: 'post',
    params: {
      client_id: app.settings.webdx.departmentPeople.clientId,
      client_secret: app.settings.webdx.departmentPeople.clientSecret,
      grant_type: 'password',
      username: app.settings.webdx.departmentPeople.username,
      password: app.settings.webdx.departmentPeople.password,
    },
  };
  return axios(axiosOptions)
    .then((response: any) => {
      return response.data.access_token;
    })
    .catch((error: Error) => {
      console.log('Axios error when fetching access token: ');
      console.log({ error });
    });
}
