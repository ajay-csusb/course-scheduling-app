import { IClass, IMeetingDate } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { baseClassJson } from './ClassesJson';
import * as MeetingDay from '../src/public/js/MeetingDay';
import _ from 'lodash';

describe('Filter by meeting date', () => {
  let classes: IClass[] = [];
  const meetingDay: IMeetingDate = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };
  let class1: IClass;
  let class2: IClass;
  let class3: IClass;

  beforeAll(() => {
    class1 = TestUtils.copyObject(baseClassJson);
    class1.mon = 'Y';
    class2 = TestUtils.copyObject(baseClassJson);
    class2.wed = 'Y';
    class3 = TestUtils.copyObject(baseClassJson);
    class3.fri = 'Y';
    classes = [class2, class3, class1];
  });

  test('classes on monday', () => {
    meetingDay.mon = true;
    const filteredClasses = MeetingDay.filter(classes, meetingDay);
    expect(filteredClasses).toHaveLength(1);
  });

  test('when multiple days are selected', () => {
    meetingDay.mon = true;
    meetingDay.wed = true;
    const filteredClasses = MeetingDay.filter(classes, meetingDay);
    expect(filteredClasses).toHaveLength(2);
  });

  test('when no days are selected', () => {
    meetingDay.mon = false;
    meetingDay.wed = false;
    const filteredClasses = MeetingDay.filter(classes, meetingDay);
    expect(filteredClasses).toHaveLength(3);
  });

  test('when no classes match the selected meeting day', () => {
    meetingDay.sun = true;
    const filteredClasses = MeetingDay.filter(classes, meetingDay);
    expect(filteredClasses).toHaveLength(0);
  });

  test('when all days are selected', () => {
    meetingDay.mon = true;
    meetingDay.tue = true;
    meetingDay.wed = true;
    meetingDay.thu = true;
    meetingDay.fri = true;
    meetingDay.sat = true;
    meetingDay.sun = true;
    const filteredClasses = MeetingDay.filter(classes, meetingDay);
    expect(filteredClasses).toHaveLength(3);
  });

  describe.each(getFilterClassData())(
    'MeetingDay.filter(%o, %o, %i)',
    (classes, meetingDay, expectedClassCount) => {
      const filteredClasses = MeetingDay.filter(classes, meetingDay);

      it(`should return ${expectedClassCount}`, () => {
        expect(filteredClasses).toHaveLength(expectedClassCount);
      });
    }
  );

  function getFilterClassData() {
    const onlineClass = TestUtils.copyObject(baseClassJson);
    onlineClass.mon = 'Y';
    onlineClass.instructionMode = 'OL';
    const fullyOnlineClass = TestUtils.copyObject(baseClassJson);
    fullyOnlineClass.wed = 'Y';
    fullyOnlineClass.instructionMode = 'FO';
    const hybridOnline = TestUtils.copyObject(baseClassJson);
    hybridOnline.fri = 'Y';
    hybridOnline.instructionMode = 'HO';
    const asyncOnlineClass: IClass = TestUtils.copyObject(baseClassJson);
    asyncOnlineClass.classStartTime = '';
    asyncOnlineClass.classEndTime = '';
    asyncOnlineClass.instructionMode = _.sample(['OL', 'FO', 'HO']);
    const inPersonClass: IClass = TestUtils.copyObject(baseClassJson);
    inPersonClass.mon = 'Y';
    inPersonClass.wed = 'Y';
    inPersonClass.fri = 'Y';
    inPersonClass.instructionMode = 'P';
    const mon = TestUtils.copyObject(meetingDay);
    const sun = TestUtils.copyObject(meetingDay);
    const classesWithAsync = [fullyOnlineClass, hybridOnline, onlineClass, asyncOnlineClass, inPersonClass];
    const classesWithNoAsync = [fullyOnlineClass, hybridOnline, onlineClass, inPersonClass];

    return [
      [classesWithNoAsync, _.set(mon, 'mon', true), 2],
      [classesWithAsync, _.set(mon, 'mon', true), 3],
      [classesWithNoAsync, _.set(sun, 'sun', true), 0],
      [classesWithAsync, _.set(sun, 'sun', true), 1],
      [
        classesWithNoAsync,
        {
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fri: true,
          sat: false,
          sun: false,
        },
        4,
      ],
      [
        classesWithAsync,
        {
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fri: true,
          sat: false,
          sun: false,
        },
        5,
      ],
    ];
  }
});
