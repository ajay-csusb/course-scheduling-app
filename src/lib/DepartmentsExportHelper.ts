import { BigQueryTimestamp } from '@google-cloud/bigquery';
import axios, { AxiosRequestConfig } from 'axios';
import { app } from '../public/js/ClassSearch.d';
import he from 'he';
import {
  Department,
  IDepartmentHoursTableInterface,
  IDepartmentsTableInterface,
  IHoursListInterface,
} from '../lib/Department';
import { getWebDxAccessToken } from '../lib/Utils';
import _ from 'lodash';

let allDepts: IDepartmentsTableInterface[] = [];
let departmentHours: IDepartmentHoursTableInterface[] = [];

export async function fetchDepartments(): Promise<any> {
  let departments = [];
  const accessToken = await getWebDxAccessToken();
  const axiosOptions: AxiosRequestConfig = {
    baseURL: app.settings.webdxSsoBaseUrl,
    url: '/OD/rest/v1/searchDept2',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    data: {
      deptTitle: '',
    },
  };
  console.log('Fetching departments...');
  return axios(axiosOptions)
    .then((response: object) => {
      departments = Object.values(response).pop();
      processDepartmentsAndDepartmentHours(departments);
      console.log('Processing departments...');
      return { allDepts, departmentHours };
    })
    .catch((error: Error) => {
      console.log('Error fetching department list: ');
      console.log({ error });
    });
}

function processDepartmentsAndDepartmentHours(departments: any): void {
  const depts: Department[] = [];
  departments.forEach((department: any) => {
    department.division = he.decode(department.division);
    depts.push(new Department(department));
  });
  depts.forEach(dept => {
    const deptMachineName = _.replace(_.lowerCase(dept.title.trim()), / /gi, '_');
    const bigQueryTimestamp = new BigQueryTimestamp(new Date()).value;
    let deptRow: IDepartmentsTableInterface = dept as IDepartmentsTableInterface;
    deptRow.departmentId = deptMachineName;
    deptRow.timestamp = bigQueryTimestamp;
    setDepartmentHours(dept.hoursList, deptMachineName, bigQueryTimestamp);
    delete deptRow.hoursList;
    if (deptRow) {
      allDepts.push(deptRow);
    }
  });
}

function setDepartmentHours(deptHours: IHoursListInterface[], machineName: string, timestamp: string): void {
  deptHours.forEach(deptHour => {
    let deptHoursObj: IDepartmentHoursTableInterface | any = {};
    Object.assign(deptHoursObj, deptHour);
    deptHoursObj.departmentId = machineName;
    deptHoursObj.timestamp = timestamp;
    if (deptHoursObj) {
      departmentHours.push(deptHoursObj);
    }
  });
}
