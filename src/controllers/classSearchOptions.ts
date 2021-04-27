import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { getWebDxAccessToken } from '../lib/Utils';
import { app } from '../public/js/ClassSearch.d';
import NodeCache from 'node-cache';
const cache = new NodeCache();

export async function index(_req: Request, res: Response): Promise<any> {
  try {
    if (cache.has('dropdown')) {
      fetchDropdown();
      return res.status(200).json(cache.get('dropdown'));
    }
    const responseMessage = await fetchDropdown();
    return res.status(200).json(responseMessage);
  } catch (error) {
    return res.status(400).json({});
  }
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
      if (response && response.status === 200) {
        return response.data;
      }
      throw new Error('Something went wrong during fetching dropdown');
    })
    .then((res: any) => {
      if (res.length !== 0) {
        cache.set('dropdown', res);
        responseMessage = res;
      }
    })
    .catch((error: Error) => {
      console.error(error);
      throw new Error('Something went wrong when making a request to fetch dropdown options');
    });
  return responseMessage;
}
