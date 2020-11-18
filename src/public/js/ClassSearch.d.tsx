import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
export const app = {
  state: {
    currentTerm: 2208,
  },
  settings: {
    dropdownUrl: 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList',
    excelUrlDev: 'https://dev-dot-csusb-class-schedule.df.r.appspot.com/export-to-excel',
    excelUrl: 'https://csusb-class-schedule.df.r.appspot.com/export-to-excel',
    firstSemester: 2208,
    getClassesUrl: 'https://webdx.csusb.edu/ClassSchedule/v2/cs/list/search',
    webdx: {
      departmentPeople: {
        clientSecret: process.env.WEBDX_DEPARTMENT_PEOPLE_CLIENT_SECRET,
        clientId: 'webdx',
        username: 'webdx',
        password: process.env.WEBDX_DEPARTMENT_PEOPLE_CLIENT_PASSWORD,
        baseUrl: 'https://webdx.csusb.edu/',
        departmentTableName: 'departments',
        departmentHoursTableName: 'departmentHours',
      },
    },
  },
};
