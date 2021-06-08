import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { getWebDxAccessToken, filterClasses } from '../lib/Utils';
import { app } from '../public/js/ClassSearch.d';
import NodeCache from 'node-cache';
import _ from 'lodash';

const cache = new NodeCache({ stdTTL: 15768000 });

export async function index(req: Request, res: Response): Promise<any> {
  console.log('Cache keys:', cache.keys());
  try {
    if (req.body && cache.has(req.body.strm)) {
      const cacheContents: [] = cache.get(req.body.strm) || [];
      const classes = filterClasses(cacheContents, req.body);
      fetchClassesAsync(req);
      return res.status(200).json(classes);
    }
    const allClasses = await fetchClassesAsync(req);
    const classes = filterClasses(allClasses, req.body);
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json({});
  }
}

function santizeFetchArguments(args: any): any {
  let sanitizedArgs = _.cloneDeep(args);
  for (const [key] of Object.entries(sanitizedArgs)) {
    sanitizedArgs[key] = key === 'strm' ? sanitizedArgs[key] : '';
  }
  return sanitizedArgs;
}

async function fetchClassesAsync(req: Request): Promise<any> {
  let responseMessage = {};
  const url = app.settings.webdxSsoBaseUrl + app.settings.classSearchApiUrl.v1.full;
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
      if (response && response.status === 200) {
        return response.data;
      }
      throw new Error('Something went wrong during fetching data');
    })
    .then((res: any) => {
      if (res.length !== 0) {
        cache.set(req.body.strm.toString(), res);
        responseMessage = res;
      }
    })
    .catch((error: Error) => {
      console.error(error);
      throw new Error('Something went wrong during fetching data');
    });
  return responseMessage;
}
