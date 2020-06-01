
import { IClass, Class } from '../public/js/Class';
import * as ClassSearchUtils from '../public/js/ClassSearchUtils';
const excel = require('node-excel-export');

export interface ExcelData {
  campus: string;
  classNumber: number;
  classSection: string;
  courseAttr: string;
  csuUnits: number;
  fullSsrComponent: string;
  instructionMode: string;
  instructorName: string;
  meetingDay: string;
  meetingTime: string;
  seatsAvailable: string;
  sessionCode: string;
  subject: string;
  term: string;
  title: string;
  waitlistSeatsAvailable: string;
}

export function getExcelDocument(data: any) {
  return excel.buildExport([{
    name: 'Class Search Report',
    heading: getColumnTitle(),
    merges: getColumnMergeInfo(),
    specification: getColumnSpecification(),
    data: getDataForExcel(data),
  }]);
}

export function getDataForExcel(classes: IClass[]): ExcelData[] {
  const results: ExcelData[] = [];
  for (const _class of classes) {
    const result: ExcelData = extractExcelData(_class);
    results.push(result);
  }
  return results;
}

function extractExcelData(_class: IClass): ExcelData {
  const currClass: Class = new Class(_class);
  const { campus, catalogNo, classNumber, classSection, courseAttr, csuUnits, enrolledCapacity, fullSsrComponent, instructorName, quarter, subject, title, topic, waitlistCapacity} = _class;
  const result: ExcelData = {
    term: quarter,
    subject: `${subject} ${catalogNo}`,
    title: `${title}${ClassSearchUtils.formatSubjectTopic(topic)}`,
    campus: ClassSearchUtils.getCampusName(campus),
    classNumber: classNumber,
    classSection: classSection,
    courseAttr: courseAttr,
    csuUnits: csuUnits,
    fullSsrComponent: fullSsrComponent,
    instructionMode: ClassSearchUtils.getInstructionMode(_class),
    instructorName: instructorName,
    meetingDay: currClass.getClassMeetingDates(),
    meetingTime: currClass.getClassMeetingTimes(),
    seatsAvailable: `${ClassSearchUtils.getNoOfAvailableSeats(_class)}/${enrolledCapacity}`,
    sessionCode: ClassSearchUtils.getSessionCode(_class),
    waitlistSeatsAvailable: `${ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(_class)}/${waitlistCapacity}`,
  };
  return result;
}

function getColumnSpecification() {
  const col: any = {};
  const colName = [
    'term',
    'subject',
    'title',
    'classSection',
    'classNumber',
    'fullSsrComponent',
    'csuUnits',
    'instructorName',
    'meetingDay',
    'meetingTime',
    'instructionMode',
    'sessionCode',
    'seatsAvailable',
    'waitlistSeatsAvailable',
    'courseAttr',
    'campus',
  ];
  for (const i of colName) {
    col[i] = {
      width: 120,
    };
  }
  return col;
}

function getColumnTitle() {
  return [
    [
      'Term',
      'Subject',
      'Title',
      'Section',
      'Class Number',
      'Types',
      'Unit',
      'Instructor',
      'Days(s)',
      'Time',
      'Mode',
      'Session',
      'Seats Available',
      'Wailtist Seats Available',
      'Attribute',
      'Campus',
    ],
  ];
}

function getColumnMergeInfo() {
  const results = [];

  for (let index = 1; index <= getColumnTitle()[0].length; index++) {
    results.push({ start: { row: 1, column: index }, end: { row: 2, column: index } });
  }

  return results;
}
