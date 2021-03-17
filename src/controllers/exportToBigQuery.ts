import { Request, Response } from 'express';
import { BigQuery, TableMetadata } from '@google-cloud/bigquery';
import * as _ from 'lodash';
import axios from 'axios';
import { Class, IClass } from '../public/js/Class';
import dotenv from 'dotenv';
import { app } from '../public/js/ClassSearch.d';
dotenv.config({ path: '.env' });

let currentTerm = app.settings.firstSemester;
let terms: object = {};
let classesCurrentTerm: IClass[] = [];
let isTermSet: boolean = false;
const bigQueryOptions = {
  keyFilename: process.env.INIT_CWD + '/application_default_credentials.json',
  projectId: 'csusb-class-schedule',
};
let bigqueryClient = new BigQuery(bigQueryOptions);
let dataset = bigqueryClient.dataset('testDataset');

if (process.env && process.env.NODE_ENV !== 'local') {
  bigqueryClient = new BigQuery();
  dataset = bigqueryClient.dataset('ClassSchedule');
}
let message = 'Processing...';
let success: boolean = true;
let errors = 'No errors';

export async function index(req: Request, res: Response): Promise<Response> {
  currentTerm = app.settings.firstSemester;
  if (req.params.termId) {
    currentTerm = req.params.termId;
    isTermSet = true;
  }
  try {
    await exportClassSearchData();
    const responseObj = {
      message: message,
      success: success,
      errors: errors,
    };
    console.log(responseObj);
    return res.status(200).json(responseObj);
  } catch (error) {
    const responseObj = {
      message: 'Error processing request',
      success: false,
      errors: error.toString(),
    };
    console.log(responseObj);
    return res.status(400).json(responseObj);
  }
}

async function exportClassSearchData() {
  classesCurrentTerm = [];
  await getTerms();
  await createMissingTables();
  await getClassesForTerm();
  await insertClassesCurrentTerm();
}

function insertClassesCurrentTerm(): Promise<any> {
  let tableName = terms[currentTerm];
  if (!tableName) {
    const previousTerms = {
      '2184': 'spring2018',
      '2182': 'winter2018',
      '2178': 'fall2017',
      '2176': 'summer2017',
      '2174': 'spring2017',
      '2172': 'winter2017',
      '2168': 'fall2016',
      '2166': 'summer2016',
      '2164': 'spring2016',
      '2162': 'winter2016',
      '2158': 'fall2015',
      '2156': 'summer2015',
      '2154': 'spring2015',
      '2152': 'winter2015',
    };
    tableName = previousTerms[currentTerm];
  }
  return dataset
    .table(tableName)
    .insert(classesCurrentTerm)
    .then(() => {
      message = 'Added ' + classesCurrentTerm.length + ' rows to table: ' + tableName;
    })
    .catch(err => {
      console.error('Error insertion error: ' + { err });
      errors = 'Error insertion error: ' + { err };
      success = false;
    });
}

async function createMissingTables(): Promise<any> {
  const tableIds = await getMissingTables();
  if (tableIds.length === 0) {
    return;
  }
  // @ts-ignore
  const tableSchema: TableMetadata = {
    schema:
      'amount: integer,' +
      'academicGroup: string,' +
      'academicOrg: string,' +
      'buildingCode: string,' +
      'campus: string,' +
      'catalogNo: string,' +
      'classEndTime: string,' +
      'classSection: string,' +
      'classStartTime: string,' +
      'classMeetingNo: integer,' +
      'classNumber: integer,' +
      'classStatus: string,' +
      'classType: string,' +
      'courseAttr: string,' +
      'courseAttrDescription: string,' +
      'courseId: string,' +
      'courseOfferNo: integer,' +
      'csuUnits: string,' +
      'date: string,' +
      'degreeType: string,' +
      'description: string,' +
      'employeeId: string,' +
      'enrolledCapacity: integer,' +
      'enrollmentStatus: string,' +
      'enrolledTotal: integer,' +
      'facilityId: string,' +
      'fee: string,' +
      'fri: string,' +
      'fullSsrComponent: string,' +
      'geCourseAttr: string,' +
      'instructorAltName: string,' +
      'instructorEmployeeId: string,' +
      'instructionMode: string,' +
      'instructorName: string,' +
      'longDescription: string,' +
      'mon: string,' +
      'profile: string,' +
      'quarter: string,' +
      'room: string,' +
      'sat: string,' +
      'sbCourseZccm: string,' +
      'schedulePrint: string,' +
      'sessionCode: string,' +
      'ssrComponent: string,' +
      'subject: string,' +
      'sun: string,' +
      'textbook: string,' +
      'thurs: string,' +
      'title: string,' +
      'topic: string,' +
      'tues: string,' +
      'waitlistCapacity: integer,' +
      'waitlistTotal: integer,' +
      'wed: string',
  };

  tableIds.forEach((id: string) => {
    dataset
      .createTable(id, tableSchema)
      .then((data: any) => {
        console.log('Created table: ' + data[0].id);
        message = 'Created table: ' + data[0].id;
      })
      .catch((error: any) => {
        console.log('Error creating table : ' + error.message);
        errors = 'Error creating table : check the logs for more information';
        success = false;
      });
  });
}

function getMissingTables(): Promise<any> {
  const tableNames: string[] = [];

  return dataset
    .getTables()
    .then(data => {
      const tables = data[0];
      tables.forEach(table => {
        tableNames.push(table.id!);
      });

      return tableNames;
    })
    .then(() => {
      return _.xor(Object.values(terms), tableNames);
    })
    .catch(error => {
      console.log('Error processing table names: ' + error.message);
      errors = 'Error processing table names: ' + error.message;
      success = false;
    });
}

async function getTerms(): Promise<any> {
  const axiosOptions = {
    baseURL: 'http://webdx.csusb.edu',
    url: '/ClassSchedule/v2/getDropDownList',
  };

  try {
    const data = await axios(axiosOptions);
    const jsonData = data.data.termList;
    setCurrentTerm(jsonData);
    terms = parseTerms(jsonData);
  } catch (error) {
    console.log('Error processing terms: ' + error);
    errors = 'Error processing terms: ' + error;
    success = false;
  }
}

async function getClassesForTerm(term: number = currentTerm): Promise<any> {
  try {
    const data = await axios({
      baseURL: 'http://webdx.csusb.edu',
      method: 'post',
      url: '/ClassSchedule/v2/cs/list/search',
      data: {
        strm: term,
        class_nbr: '',
        section_code: '',
        subject: '',
        name: '',
        catalog_nbr: '',
        campus: '',
        crse_attr: '',
        crse_attr_value: '',
        meeting_time_start: '',
        ssr_component: '',
        mon: '',
        tues: '',
        wed: '',
        thurs: '',
        fri: '',
        sat: '',
        sun: '',
        instruction_mode: '',
        acad_career: '',
      },
    });
    data.data.forEach((_class: any) => {
      const transformedClass = Class.transformToClass(_class);
      transformedClass['date'] = bigqueryClient.datetime({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
      }).value;
      const formattedInstructorName = transformedClass['instructorName'] !== ' ' ? transformedClass['instructorName'].split(', ') : '';
      transformedClass['instructorName'] = typeof(formattedInstructorName) === 'object' ? `${formattedInstructorName[1]} ${formattedInstructorName[0]}` : ''; 
      classesCurrentTerm.push(transformedClass);
    });
  } catch (error) {
    console.log('Error processing classes: ' + error);
    errors = 'Error processing classes: ' + error;
    success = false;
  }
}

function parseTerms(terms: any): object {
  let parsedTerms: object = {};
  terms.forEach((term: any) => {
    parsedTerms[term.strm] = _.camelCase(term.display_STR.replace(/ /, ''));
  });
  return parsedTerms;
}

function setCurrentTerm(terms: any): void {
  if (currentTerm !== app.settings.firstSemester && isTermSet) {
    return;
  }
  try {
    terms.forEach((term: any) => {
      if (term.displayed_FLAG === 'Y' && term.default_FLG === 'Y') {
        currentTerm = term.strm;
      }
    });
  } catch (error) {
    console.log('Error processing current term' + error);
    errors = 'Error processing current term' + error;
    success = false;
  }
}
