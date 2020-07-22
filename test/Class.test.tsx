import { Class, IClass } from '../src/public/js/Class';
import { rawClassesJson } from './ClassesJson';
import { TestUtils } from './TestUtils';

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
  title: '',
  geCourseAttr: '',
  fullSsrComponent: '',
  enrollmentStatus: '',
  classStatus: '',
  topic: '',
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
    classJson.classEndTime = '';
    const classInstance: Class = new Class(classJson);
    expect(classInstance.getClassMeetingTimes()).toEqual('N/A');
  });

  test('meeting times with multiple values', () => {
    classJson.classStartTime = '7:00 AM, 6:00 PM';
    classJson.classEndTime = '9:00 AM, 8:00 PM';
    const classInstance: Class = new Class(classJson);
    expect(classInstance.getClassMeetingTimes()).toEqual('7:00 am - 9:00 am, 6:00 pm - 8:00 pm');
  });
});

describe('test classes having multiple meeting times', () => {
  test('split classes with multiple meeting times', () => {
    const rawClassesWithMultipleMeetingTimes = rawClassesJson;
    rawClassesWithMultipleMeetingTimes.meeting_TIME = [
      {
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
      },
      {
        class_START_TIME: '7:30 PM',
        class_END_TIME: '9:00 PM',
        days: 'FRI, SAT, SUN',
        mon: 'N',
        tues: 'N',
        wed: 'N',
        thurs: 'N',
        fri: 'Y',
        sat: 'Y',
        sun: 'Y',
      },
    ];

    const parsedClasses = Class.splitClassesWithMultipleMeetingTimes([rawClassesWithMultipleMeetingTimes]);
    expect(parsedClasses).toHaveLength(2);
    expect(parsedClasses[0].meeting_TIME[0].class_START_TIME).toEqual('11:30 AM');
    expect(parsedClasses[0].meeting_TIME[0].class_END_TIME).toEqual('2:00 PM');
    expect(parsedClasses[0].meeting_TIME[0].mon).toEqual('Y');
    expect(parsedClasses[0].meeting_TIME[0].tues).toEqual('Y');
    expect(parsedClasses[0].meeting_TIME[0].wed).toEqual('Y');
    expect(parsedClasses[0].meeting_TIME[0].thurs).toEqual('Y');
    expect(parsedClasses[1].meeting_TIME[0].class_START_TIME).toEqual('7:30 PM');
    expect(parsedClasses[1].meeting_TIME[0].class_END_TIME).toEqual('9:00 PM');
    expect(parsedClasses[1].meeting_TIME[0].fri).toEqual('Y');
    expect(parsedClasses[1].meeting_TIME[0].sat).toEqual('Y');
    expect(parsedClasses[1].meeting_TIME[0].sun).toEqual('Y');
  });

  test('splitClassesWithMultipleMeetingTimes having a single meeting time', () => {
    const singleClass = rawClassesJson;
    singleClass.meeting_TIME = [
      {
        class_START_TIME: '3:00 PM',
        class_END_TIME: '5:00 PM',
        days: 'MON',
        mon: 'Y',
        tues: 'N',
        wed: 'N',
        thurs: 'N',
        fri: 'N',
        sat: 'N',
        sun: 'N',
      },
    ];
    const parsedClasses = Class.splitClassesWithMultipleMeetingTimes([singleClass]);
    expect(parsedClasses).toHaveLength(1);
  });

  test('splitClassesWithMultipleMeetingTimes with multiple classes', () => {
    const class1 = TestUtils.copyObject(rawClassesJson);
    const class2 = TestUtils.copyObject(rawClassesJson);
    const class3 = TestUtils.copyObject(rawClassesJson);
    class1.meeting_TIME = [
      {
        class_START_TIME: '3:00 PM',
        class_END_TIME: '5:00 PM',
        days: 'MON',
        mon: 'Y',
        tues: 'N',
        wed: 'N',
        thurs: 'N',
        fri: 'N',
        sat: 'N',
        sun: 'N',
      },
      {
        class_START_TIME: '5:00 PM',
        class_END_TIME: '7:00 PM',
        days: 'MON',
        mon: 'Y',
        tues: 'N',
        wed: 'N',
        thurs: 'N',
        fri: 'N',
        sat: 'N',
        sun: 'N',
      },
    ];

    class2.meeting_TIME = [
      {
        class_START_TIME: '8:00 AM',
        class_END_TIME: '10:00 AM',
        days: 'TUE',
        mon: 'N',
        tues: 'Y',
        wed: 'N',
        thurs: 'N',
        fri: 'N',
        sat: 'N',
        sun: 'N',
      },
    ];

    class3.meeting_TIME = [
      {
        class_START_TIME: '',
        class_END_TIME: '',
        days: '',
        mon: 'N',
        tues: 'N',
        wed: 'N',
        thurs: 'N',
        fri: 'N',
        sat: 'N',
        sun: 'N',
      },
    ];
    const parsedClasses = Class.splitClassesWithMultipleMeetingTimes([class2, class1, class3]);
    expect(parsedClasses).toHaveLength(4);
    expect(parsedClasses[0].meeting_TIME[0].class_START_TIME).toEqual('8:00 AM');
    expect(parsedClasses[1].meeting_TIME[0].class_START_TIME).toEqual('3:00 PM');
    expect(parsedClasses[2].meeting_TIME[0].class_START_TIME).toEqual('5:00 PM');
    expect(parsedClasses[3].meeting_TIME[0].class_START_TIME).toEqual('');
  });
});
