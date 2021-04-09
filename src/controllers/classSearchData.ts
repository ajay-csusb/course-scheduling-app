import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { getWebDxAccessToken } from '../lib/Utils';
import { app } from '../public/js/ClassSearch.d';

export async function index(req: Request, res: Response): Promise<any> {
  let responseMessage = {};
  const accessToken = await getWebDxAccessToken();
  const url = app.settings.classSearchApiUrl.v1.full;
  await axios
    .post(url, req.body, {
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
      throw new Error('Something went wrong during fetching data');
    })
    .then((res: any) => {
      responseMessage = res;
    })
    .catch((error: Error) => {
      console.error(error);
    });
  // @Todo what is the responseMessage when we get an error?
  return res.status(200).json(responseMessage);
}
