import { getDataForExcel, ExcelData, getExcelDocument } from '../src/lib/ExportToExcel';
import { classJson, classPDC } from './ClassesJson';
import { TestUtils } from './TestUtils';

test('dataset', () => {
  const acctClass = TestUtils.copyObject(classJson);
  acctClass.courseAttr = 'Foo';
  acctClass.topic = 'Special topics in Accounting';
  acctClass.fullSsrComponent = 'Activity';
  const classes = [acctClass, classPDC];
  const dataset: ExcelData[] = getDataForExcel(classes);
  expect(dataset).toHaveLength(2);
  expect(dataset[0].term).toEqual('2194');
  expect(dataset[0].subject).toEqual('ACCT 101');
  expect(dataset[0].title).toEqual('Introduction to Accounting: Special Topics In Accounting');
  expect(dataset[0].classSection).toEqual('01');
  expect(dataset[0].classNumber).toEqual(101);
  expect(dataset[0].fullSsrComponent).toEqual('Activity');
  expect(dataset[0].csuUnits).toEqual(4);
  expect(dataset[0].instructorName).toEqual('Dyck, Harold');
  expect(dataset[0].meetingDay).toEqual('M-W');
  expect(dataset[0].meetingTime).toEqual('12:00 pm - 1:50 pm');
  expect(dataset[0].instructionMode).toEqual('Classroom');
  expect(dataset[0].sessionCode).toEqual('Regular');
  expect(dataset[0].seatsAvailable).toEqual('2/30');
  expect(dataset[0].waitlistSeatsAvailable).toEqual('99/100');
  expect(dataset[0].courseAttr).toEqual('Foo');
  expect(dataset[0].campus).toEqual('San Bernardino');
});

test('getExcelDocument', () => {
  const classes = [classJson, classPDC];
  const excelData = getExcelDocument(classes);
  expect(excelData).toBeInstanceOf(Buffer);
});
