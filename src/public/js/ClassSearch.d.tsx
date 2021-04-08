import { loadEnvironmentVariables } from '../../lib/Utils';

loadEnvironmentVariables();
export const app = {
  state: {
    currentTerm: 2214,
  },
  settings: {
    dropdownUrl: { 
      v0: 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList',
      v1: 'https://webdx-sso.csusb.edu/ClassSchedule/rest/v1/getDropDownList',
    },
    excelUrlDev: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com/export-to-excel',
    excelUrl: 'https://csusb-class-schedule.df.r.appspot.com/export-to-excel',
    firstSemester: 2208,
    classSearchApiUrl: {
      v0: 'https://webdx.csusb.edu/ClassSchedule/v2/cs/list/search',
      v1: {
        full: 'https://webdx-sso.csusb.edu/ClassSchedule/rest/v1/getClassScheduleList',
        pager: 'https://webdx-sso.csusb.edu/ClassSchedule/rest/v1/getClassScheduleListByPage',
      },
    },
    proxyDropdownUrl: {
      dev: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com/get-class-search-options',
      live: 'https://csusb-class-schedule.df.r.appspot.com/get-class-search-options',
    },
    proxyClassDataUrl: {
      dev: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com/get-class-search-data',
      live: 'https://csusb-class-schedule.df.r.appspot.com/get-class-search-data',
    },
    webdx: {
      departmentPeople: {
        clientSecret: '08n23hqB7WKBIIBWpr3aa3V1EIXxZW48',
        clientId: 'webdx',
        username: 'webdx',
        password: 'mrGWdIIRH0muw1u62v5Op8skycTc5qay',
        baseUrl: 'https://webdx.csusb.edu/',
      },
    },
    getBaseUrl: {
      dev: 'https://d8-csusb.pantheonsite.io/',
      live: 'https://www.csusb.edu/',
    },
    webdxSsoBaseUrl: 'https://webdx-sso.csusb.edu/',
    appBaseUrl: 'https://csusb-class-schedule.df.r.appspot.com/',
    appDevBaseUrl: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com/',
  },
};
