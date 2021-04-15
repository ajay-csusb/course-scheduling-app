import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import _ from 'lodash';
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
      console.log('Fetching access token...');
      return response.data.access_token;
    })
    .catch((error: Error) => {
      console.log('Error fetching access token');
      console.log({ error });
    });
}

export function removeHtmlTags(str: string): string {
  return str.replace(/<(.|\n)*?>|\'\\n\'\s\+/g, '');
}

export function filterClasses(classes: any[], searchParameters: any): any[] {
  let filteredClasses = [];
  filteredClasses = _.filter(classes, classObj => {
    return (
      matchSubject(searchParameters, classObj) &&
      matchCampus(searchParameters, classObj) &&
      matchCatalogNumber(searchParameters, classObj) &&
      matchInstructorName(searchParameters, classObj) &&
      matchClassNumber(searchParameters, classObj)
    );
  });
  return filteredClasses;
}

function matchSubject(params: any, classObj: any): boolean {
  if (params.subject.length === 0) {
    return true;
  }
  return classObj.subject.trim() === params.subject;
}

function matchCampus(params: any, classObj: any): boolean {
  if (params.campus.length === 0) {
    return true;
  }
  return classObj.campus.trim() === params.campus;
}

function matchCatalogNumber(params: any, classObj: any): boolean {
  if (params.catalog_nbr.length === 0) {
    return true;
  }
  return classObj.catalog_NBR.trim() === params.catalog_nbr;
}

function matchInstructorName(params: any, classObj: any): boolean {
  if (params.name.length === 0) {
    return true;
  }
  return classObj.name.trim() === params.name;
}

function matchClassNumber(params: any, classObj: any): boolean {
  if (params.class_nbr.length === 0) {
    return true;
  }
  return classObj.class_NBR === parseInt(params.class_nbr.trim(), 10);
}

export function getKeys(req: Request, _res: Response) {
  let objectValues = '';
  for (let key in req.body) {
    objectValues += key + '=' + req.body[key];
  }
  return objectValues.length !== 0 ? objectValues : 'options';
}

export function shouldCache(_req: Request, res: Response): boolean {
  // @ts-ignore:
  return res.statusCode === 200;
}
