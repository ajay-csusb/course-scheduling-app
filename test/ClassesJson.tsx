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
    classNumber: 100,
    buildingCode: 'JB',
    room: '100',
    degreeType: 'UGRD',
    title: 'Information Technology Systems',
    geCourseAttr: '',
    topic: '',
    classStatus: 'Active',
    courseAttrDescription: '',
    fullSsrComponent: '',
    enrollmentStatus: '',
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
    classNumber: 101,
    buildingCode: 'COE',
    room: '101',
    degreeType: 'PBAC',
    title: 'Introduction to Accounting',
    geCourseAttr: '',
    topic: '',
    classStatus: 'Active',
    courseAttrDescription: '',
    fullSsrComponent: '',
    enrollmentStatus: '',
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
    classNumber: 102,
    buildingCode: 'PF',
    room: '101',
    degreeType: 'EXED',
    title: '',
    geCourseAttr: '',
    topic: '',
    classStatus: 'Active',
    courseAttrDescription: '',
    fullSsrComponent: '',
    enrollmentStatus: '',
};

export let meetingDates: IMeetingDate = {
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
  name: ' ',
  emplid2: '',
  name2: '',
  crse_ATTR: 'CEL, GE, CLSI, SOTE, CLEV',
  descrlong_VC: '',
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
  crse_TOPIC_DESCR: '',
  course_TITLE_LONG: 'Introduction to Accounting',
  crse_ATTR_VALUE: 'Active',
  crse_ATTR_VALUE_DESCR: '',
  crse_COMPONENT_DESCR: '',
  enrl_STAT: '',
  meeting_TIME: [{
    class_START_TIME: '11:30 AM',
    class_END_TIME: '2:00 PM',
    days: 'MON, TUE, WED, THUR',
    mon: 'Y',
    tues: 'Y',
    wed: 'Y',
    thurs: 'Y',
    fri: 'N',
    sat: 'N',
    sun: 'N',
  }],
};
