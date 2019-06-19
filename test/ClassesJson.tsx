import { IClass, IMeetingDate } from '../src/public/js/Class';

export let baseClassJson: IClass = {
    quarter: '2194',
    subject: 'IST',
    catalogNo: ' 468',
    classSection: '01',
    textbook: '',
    employeeId: '001343367',
    classStartTime: '8:00 AM',
    classEndTime: '9:50 AM',
    enrolledCapacity: 30,
    enrolledTotal: 28,
    waitlistCapacity: 100,
    waitlistTotal: 1,
    classMeetingNo: 1,
    csuUnits: 4,
    amount: 0,
    courseId: '000001',
    sessionCode: '1',
    description: 'Information technology systems',
    ssrComponent: 'SEM',
    campus: 'MAIN',
    instructionMode: 'OL',
    facilityId: 'JB0113',
    mon: 'Y',
    tues: 'N',
    wed: 'Y',
    thurs: 'N',
    fri: 'N',
    sat: 'N',
    sun: 'N',
    instructorName: 'Bakeman, Melissa',
    courseAttr: '',
};

export const classJson: IClass = {
    quarter: '2194',
    subject: 'ACCT',
    catalogNo: '101',
    classSection: '01',
    textbook: '',
    employeeId: '001343367',
    classStartTime: '12:00 PM',
    classEndTime: '1:50 PM',
    enrolledCapacity: 30,
    enrolledTotal: 28,
    waitlistCapacity: 100,
    waitlistTotal: 1,
    classMeetingNo: 1,
    csuUnits: 4,
    amount: 0,
    courseId: '000001',
    sessionCode: '1',
    description: 'ACCT GOVT & NONPROFIT ORG',
    ssrComponent: 'SEM',
    campus: 'MAIN',
    instructionMode: 'P',
    facilityId: 'JB0113',
    mon: 'Y',
    tues: 'N',
    wed: 'Y',
    thurs: 'N',
    fri: 'N',
    sat: 'N',
    sun: 'N',
    instructorName: 'Dyck, Harold',
    courseAttr: '',
};
export const classPDC: IClass = {
    quarter: '2192',
    subject: 'ECON',
    catalogNo: '201',
    classSection: '01',
    textbook: '',
    employeeId: '001343367',
    classStartTime: '6:00 PM',
    classEndTime: '7:50 PM',
    enrolledCapacity: 30,
    enrolledTotal: 28,
    waitlistCapacity: 100,
    waitlistTotal: 1,
    classMeetingNo: 1,
    csuUnits: 4,
    amount: 0,
    courseId: '000001',
    sessionCode: '1',
    description: 'ACCT GOVT & NONPROFIT ORG',
    ssrComponent: 'SEM',
    campus: 'PALM',
    instructionMode: 'P',
    facilityId: 'JB0113',
    mon: 'N',
    tues: 'Y',
    wed: 'N',
    thurs: 'Y',
    fri: 'N',
    sat: 'N',
    sun: 'N',
    instructorName: 'Coates, Breena',
    courseAttr: '',
};

export let meetingDates: IMeetingDate = {
    all: true,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
};

export let startMeetingTime: Date = new Date('1899-01-01T08:00:00');
export let endMeetingTime: Date = new Date('1899-01-01T22:00:00');

export const rawClassesJson = {
  contentList: [
    {
      emplid: ' ',
      profile_PATH: '',
      strm: '2194',
      subject: 'ACCT',
      catalog_NBR: ' 111B',
      class_SECTION: '01',
      book: '<form action=\'http://www.bkstr.com/webapp/wcs/stores/servlet/booklookServlet\' method=\'post\' target=\'_blank\'><input type=\'Submit\' value=\'View Textbook\' style=\'width:10em\'><input type=\'hidden\' name=\'bookstore_id-1\' value=\'1100\'><input type=\'hidden\' name=\'term_id-1\' value=\'2196\'><input type=\'hidden\' name=\'div-1\' value=\'\'><input type=\'hidden\' name=\'dept-1\' value=\'MATH\'><input type=\'hidden\' name=\'course-1\' value=\' 111B\'><input type=\'hidden\' name=\'section-1\' value=\'01\'></form>',
      consent: '',
      facility_ID: '',
      bldg_CD: 'CE',
      room: '241',
      mon: 'Y',
      tues: 'Y',
      wed: 'Y',
      thurs: 'Y',
      fri: 'N',
      sat: 'N',
      sun: 'N',
      name: ' ',
      emplid2: '',
      name2: '',
      crse_ATTR: '',
      descrlong_VC: '',
      class_START_TIME: '',
      class_END_TIME: '',
      crse_OFFER_NBR: null,
      class_NBR: null,
      enrl_CAP: null,
      enrl_TOT: null,
      wait_CAP: null,
      wait_TOT: null,
      class_MTG_NBR: null,
      csu_APDB_CMP_UNITS: 4,
      flat_AMT: null,
      crse_ID: '029711',
      session_CODE: '',
      descr: 'ACC STRETCH COLLEGE ALG B',
      ssr_COMPONENT: '',
      class_TYPE: '',
      class_STAT: '',
      campus: 'MAIN',
      schedule_PRINT: '',
      acad_GROUP: '',
      acad_ORG: '',
      instruction_MODE: 'ol',
      sb_CRSE_ZCCM: '',
    },
  ],
};
