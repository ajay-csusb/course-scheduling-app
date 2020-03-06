import { Class, IClass } from '../src/public/js/Class';

const classJson: IClass = {
    quarter: '2194',
    subject: 'ACCT',
    catalogNo: ' 468',
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
    campus: 'MAIN',
    instructionMode: 'P',
    instructorName: 'Foo',
    facilityId: 'JB0113',
    mon: 'Y',
    tues: 'N',
    wed: 'Y',
    thurs: 'N',
    fri: 'N',
    sat: 'N',
    sun: 'N',
    buildingCode: '',
    room: '',
    degreeType: '',
    courseAttr: '',
  };

describe('test meeting day', () => {
  test('correct meeting day is returned for a class instance', () => {
    const classInstance: Class = new Class(classJson);
    expect(classInstance.getClassMeetingDates()).toEqual('M-W');
  });

  test('null is returned if no meeting date is set', () => {
    classJson.mon = 'N';
    classJson.wed = 'N';
    const classInstance = new Class(classJson);
    expect(classInstance.getClassMeetingDates()).toEqual('N/A');
  });

  test('correct day is returned for Monday, Tuesday and Thursday', () => {
    classJson.mon = 'Y';
    classJson.tues = 'Y';
    classJson.wed = 'N';
    classJson.thurs = 'Y';
    const classInstance = new Class(classJson);
    expect(classInstance.getClassMeetingDates()).toEqual('M-Tu-Th');
  });

});

describe('test meeting times', () => {
  test('meeting times are in the correct format', () => {
    const classInstance: Class = new Class(classJson);
    expect(classInstance.getClassMeetingTimes()).toEqual('6:00 pm - 7:50 pm');
  });

  test('meeting times are empty', () => {
    classJson.classStartTime = '';
    classJson.classEndTime =  '';
    const classInstance: Class = new Class(classJson);
    expect(classInstance.getClassMeetingTimes()).toEqual('N/A');
  });

});
