import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { getWebDxAccessToken } from '../lib/Utils';
import { app } from '../public/js/ClassSearch.d';
import NodeCache from 'node-cache';
const cache = new NodeCache();

export async function index(_req: Request, res: Response): Promise<any> {
  let responseMessage = {};
  if (cache.has('dropdown')) {
    fetchDropdown();
    return res.status(200).json(cache.get('dropdown'));
  }
  responseMessage = await fetchDropdown();
  return res.status(200).json(responseMessage);
}

async function fetchDropdown(): Promise<any> {
  let responseMessage = {};
  const accessToken = await getWebDxAccessToken();
  const url = app.settings.webdxSsoBaseUrl + app.settings.dropdownUrl.v1;
  await axios(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((response: AxiosResponse): object => {
      if (response) {
        return response.data;
      }
      responseMessage = { error: 'Error encountered while fetching dropdown data' };
      throw new Error('Something went wrong during fetching data');
    })
    .then((res: any) => {
      cache.set('dropdown', res);
      responseMessage = res;
    })
    .catch((error: Error) => {
      console.error(error);
      responseMessage = { error: 'Error encountered while fetching dropdown data' };
    });
  return responseMessage;
}
