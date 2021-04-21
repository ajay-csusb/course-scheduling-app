import { loadEnvironmentVariables } from '../../lib/Utils';

loadEnvironmentVariables();
export const app = {
  state: {
    currentTerm: 2214,
  },
  settings: {
    dropdownUrl: {
      v0: '/ClassSchedule/v2/getDropDownList',
      v1: '/ClassSchedule/rest/v1/getDropDownList',
    },
    excelUrlDev: '/export-to-excel',
    excelUrl: '/export-to-excel',
    firstSemester: 2208,
    classSearchApiUrl: {
      v0: '/ClassSchedule/v2/cs/list/search',
      v1: {
        full: '/ClassSchedule/rest/v1/getClassScheduleList',
        pager: '/ClassSchedule/rest/v1/getClassScheduleListByPage',
      },
    },
    proxyDropdownUrl: {
      dev: '/get-class-search-options',
      live: '/get-class-search-options',
    },
    proxyClassDataUrl: {
      dev: '/get-class-search-data',
      live: '/get-class-search-data',
    },
    webdx: {
      departmentPeople: {
        clientSecret: process.env.WEBDX_DEPARTMENT_PEOPLE_CLIENT_SECRET,
        clientId: 'webdx',
        username: 'webdx',
        password: process.env.WEBDX_DEPARTMENT_PEOPLE_CLIENT_PASSWORD,
        baseUrl: 'https://webdx.csusb.edu/',
      },
    },
    getBaseUrl: {
      dev: 'https://d8-csusb.pantheonsite.io/',
      live: 'https://www.csusb.edu/',
    },
    webdxBaseUrl: 'https://webdx.csusb.edu',
    webdxSsoBaseUrl: 'https://webdx-sso.csusb.edu',
    appBaseUrl: 'https://csusb-class-schedule.df.r.appspot.com',
    appDevBaseUrl: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com',
  },
};
