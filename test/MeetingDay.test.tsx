import { IClass, IMeetingDate } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { baseClassJson } from './ClassesJson';
import * as MeetingDay from '../src/public/js/MeetingDay';

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

  test.each([
    ['OL', 4],
    ['HC', 3],
    ['FO', 4],
    ['CM', 3],
    ['HO', 4],
    ['P', 3],
  ])(
    'when a class has instruction mode set to online',
    (instructionMode: string, expectedClassCount: number) => {
      meetingDay.mon = true;
      meetingDay.tue = false;
      meetingDay.wed = true;
      meetingDay.thu = false;
      meetingDay.fri = true;
      meetingDay.sat = false;
      meetingDay.sun = false;
      const class4: IClass = TestUtils.copyObject(baseClassJson);
      class4.instructionMode = instructionMode;
      classes = [class2, class3, class1, class4];
      const filteredClasses = MeetingDay.filter(classes, meetingDay);

      expect(filteredClasses).toHaveLength(expectedClassCount);
    }
  );
});
