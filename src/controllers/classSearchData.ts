import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { getWebDxAccessToken, filterClasses } from '../lib/Utils';
import { app } from '../public/js/ClassSearch.d';
import NodeCache from 'node-cache';
import _ from 'lodash';
const cache = new NodeCache();

export async function index(req: Request, res: Response): Promise<any> {
  let responseMessage = {};
  console.log('Cache keys:', cache.keys());
  if (req.body && cache.has(req.body.strm)) {
    const cacheContents: [] = cache.get(req.body.strm) || [];
    const classes = filterClasses(cacheContents, req.body);
    fetchClassesAsync(req);
    return res.status(200).json(classes);
  }
  responseMessage = await fetchClassesAsync(req);
  return res.status(200).json(responseMessage);
}

function santizeFetchArguments(args: any): any {
  let sanitizedArgs = _.cloneDeep(args);
  for (const [key] of Object.entries(sanitizedArgs)) {
    sanitizedArgs[key] = key === 'strm' ? sanitizedArgs[key] : '';
  }
  return sanitizedArgs;
}

async function fetchClassesAsync(req: any): Promise<any> {
  let responseMessage = {};
  const url = app.settings.classSearchApiUrl.v1.full;
  const accessToken = await getWebDxAccessToken();
  const args = santizeFetchArguments(req.body);
  console.log(`Fetching all classes for ${args.strm}...`);
  await axios
    .post(url, args, {
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
      responseMessage = { error: 'Error encountered while fetching classes' };
      throw new Error('Something went wrong during fetching data');
    })
    .then((res: any) => {
      const classes = filterClasses(res, req.body);
      cache.set(req.body.strm.toString(), res);
      responseMessage = classes;
    })
    .catch((error: Error) => {
      console.error(error);
      responseMessage = { error: 'Error encountered while fetching classes' };
    });
  return responseMessage;
}
