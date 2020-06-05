
import { IClass, Class } from '../public/js/Class';
import * as ClassSearchUtils from '../public/js/ClassSearchUtils';
const excel = require('node-excel-export');

export interface ExcelData {
  buildingCode: string;
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

export function getExcelDocument(data: any): Buffer {
  return excel.buildExport([{
    name: 'Class Search Report',
    heading: getColumnTitle(),
    merges: getColumnMergeInfo(),
    specification: getColumnSpecification(),
    data: getDataForExcel(data),
  }]);
}

export function getDataForExcel(classes: IClass[]): ExcelData[] {
  const rows: ExcelData[] = [];

  for (const _class of classes) {
    const row: ExcelData = extractExcelData(_class);
    rows.push(row);
  }

  return rows;
}

function extractExcelData(_class: IClass): ExcelData {
  const currClass: Class = new Class(_class);
  const { campus, catalogNo, classNumber, classSection, courseAttr, csuUnits, enrolledCapacity, fullSsrComponent, instructorName, quarter, subject, title, topic, waitlistCapacity} = _class;
  const rows: ExcelData = {
    buildingCode: ClassSearchUtils.getRoomNumber(_class),
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
    subject: `${subject} ${catalogNo}`,
    term: quarter,
    title: `${title}${ClassSearchUtils.formatSubjectTopic(topic)}`,
    waitlistSeatsAvailable: `${ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(_class)}/${waitlistCapacity}`,
  };

  return rows;
}

function getColumnSpecification(): any {
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
    'buildingCode',
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

function getColumnTitle(): any[] {
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
      'Building',
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

function getColumnMergeInfo(): any[] {
  const results = [];

  for (let index = 1; index <= getColumnTitle()[0].length; index++) {
    results.push({ start: { row: 1, column: index }, end: { row: 2, column: index } });
  }

  return results;
}
