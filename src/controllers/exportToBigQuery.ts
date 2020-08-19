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

export function index(req: Request, res: Response): Response {
  currentTerm = app.settings.firstSemester;

  if (req.params.termId) {
    currentTerm = req.params.termId;
    isTermSet = true;
  }
  exportClassSearchData();
  console.log(terms)
  return res.sendStatus(200);
}

async function exportClassSearchData() {
  classesCurrentTerm = [];

  if (!isTermSet) {
    await setCurrentTerm();
  } else {
    await getTerms();
  }
  await createMissingTables();
  await getClassesForTerm();
  await insertClassesCurrentTerm();
  // Hack. This line is necessary for successful execution of the script
  isTermSet = false;
}

function insertClassesCurrentTerm(): Promise<any> {
  return dataset
    .table(terms[currentTerm])
    .insert(classesCurrentTerm)
    .then(() => {
      console.log('inserted ' + classesCurrentTerm.length + ' rows in table: ' + terms[currentTerm]);
    })
    .catch(err => {
      console.error('Error: insertion error ' + { err });
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
      })
      .catch((error: any) => {
        console.log('Error creating table : ' + error.message);
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
      console.log('Error: ' + error.message);
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
    terms = parseTerms(jsonData);
  } catch (error) {
    console.log(error);
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

      classesCurrentTerm.push(transformedClass);
    });
  } catch (error) {
    console.log(error);
  }
}

function parseTerms(terms: any): object {
  let parsedTerms: object = {};

  terms.forEach((term: any) => {
    parsedTerms[term.strm] = _.camelCase(term.display_STR.replace(/ /, ''));
  });

  return parsedTerms;
}

async function setCurrentTerm(): Promise<any> {
  try {
    await getTerms();
    const term_keys = _.keys(terms);

    term_keys.forEach((term: any) => {
      if (term.displayed_FLAG === 'Y' && term.default_FLG === 'Y') {
        currentTerm = term.strm;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
