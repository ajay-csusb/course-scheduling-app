import { classJson, meetingDates, startMeetingTime, endMeetingTime, classPDC, baseClassJson } from './ClassesJson';
import { IClass, IMeetingDate } from '../src/public/js/Class';
import { UserInput } from '../src/public/js/UserInput';
import { ISubject } from '../src/public/js/Subject';
import { MeetingTime } from '../src/public/js/MeetingTime';
import { TestUtils } from '../test/TestUtils';
import { FilterClasses } from '../src/public/js/FilterClasses';
// tslint:disable:max-line-length

let classes: IClass[] = [];
let subject: ISubject = {
  name: '',
  abbr: '',
};
let uInput: UserInput = new UserInput();
classes.push(classJson);
classes.push(classPDC);
classes.push(baseClassJson);
let meetingDate: IMeetingDate = meetingDates;

beforeEach(() => {
  subject = {
    name: '',
    abbr: '',
  };
});

beforeAll(() => {
  meetingDate = meetingDates;
});

describe('Filter by meeting time', () => {
  beforeAll(() => {
    classes = [];
    const classStartingAt8am = JSON.parse(JSON.stringify(baseClassJson));
    classes.push(classStartingAt8am);
    const classStartingAt12pm = JSON.parse(JSON.stringify(baseClassJson));
    classStartingAt12pm.classStartTime = '12:00 PM';
    classStartingAt12pm.classEndTime = '3:00 PM';
    classes.push(classStartingAt12pm);
    const classStartingAt6pm = JSON.parse(JSON.stringify(baseClassJson));
    classStartingAt6pm.classStartTime = '6:00 PM';
    classStartingAt6pm.classEndTime = '8:00 PM';
    classes.push(classStartingAt6pm);
    const classStartingAt8pm = JSON.parse(JSON.stringify(baseClassJson));
    classStartingAt8pm.classStartTime = '8:00 PM';
    classStartingAt8pm.classEndTime = '10:00 PM';
    classes.push(classStartingAt8pm);
    uInput = new UserInput();
    uInput.setStartTime(startMeetingTime);
    uInput.setEndTime(endMeetingTime);
  });

  describe('when start time and end time is not set', () => {
    it('should show 4 classes', () => {
      const results = MeetingTime.filter(classes, startMeetingTime, endMeetingTime);
      expect(results).toHaveLength(4);
    });
  });

  describe('when start time is set to 12 PM and end time is set to 11 PM', () => {
    let startAt12PM: Date = startMeetingTime;
    let endAt11PM: Date = endMeetingTime;
    beforeAll(() => {
      startAt12PM = new Date('1899-01-01T12:00:00');
      endAt11PM = new Date('1899-01-01T23:00:00');
      uInput = new UserInput();
      uInput.setStartTime(startAt12PM);
      uInput.setEndTime(endAt11PM);
    });

    it('should show 3 classes', () => {
      const results = MeetingTime.filter(classes, startAt12PM, endAt11PM);
      expect(results).toHaveLength(3);
    });

  });
  describe('when start time is set to 8 AM and end time is set to 12 PM', () => {
    let startAt8AM: Date = startMeetingTime;
    let endAt12PM: Date = endMeetingTime;
    beforeAll(() => {
      startAt8AM = new Date('1899-01-01T08:00:00');
      endAt12PM = new Date('1899-01-01T12:00:00');
      uInput = new UserInput();
      uInput.setStartTime(startAt8AM);
      uInput.setEndTime(endAt12PM);
    });

    it('should show one class', () => {
      const results = MeetingTime.filter(classes, startAt8AM, endAt12PM);
      expect(results).toHaveLength(1);
    });
  });

  describe('when start time is set to 11:30 AM and end time is set to 9:45 PM', () => {
    let startAt1130AM: Date = startMeetingTime;
    let endAt945PM: Date = endMeetingTime;
    beforeAll(() => {
      startAt1130AM = new Date('1899-01-01T11:30:00');
      endAt945PM = new Date('1899-01-01T21:45:00');
      uInput = new UserInput();
      uInput.setStartTime(startAt1130AM);
      uInput.setEndTime(endAt945PM);
    });

    it('should show two class', () => {
      const results = MeetingTime.filter(classes, startAt1130AM, endAt945PM);
      expect(results).toHaveLength(2);
    });
  });

  describe('when start time is set to 10:00 PM and end time is set to 12:00 AM', () => {
    let startAt10PM: Date = startMeetingTime;
    let endAt12AM: Date = endMeetingTime;
    beforeAll(() => {
      startAt10PM = new Date('1899-01-01T22:00:00');
      endAt12AM = new Date('1899-01-01T00:00:00');
      uInput = new UserInput();
      uInput.setStartTime(startAt10PM);
      uInput.setEndTime(endAt12AM);
    });

    it('should not show any classes', () => {
      const results = MeetingTime.filter(classes, startAt10PM, endAt12AM);
      expect(results).toHaveLength(0);
    });
  });
  describe('when start time is set to 12:00 PM and end time is set to 8:00 PM', () => {
    let startAt12PM: Date = startMeetingTime;
    let endAt8PM: Date = endMeetingTime;
    beforeAll(() => {
      startAt12PM = new Date('1899-01-01T12:00:00');
      endAt8PM = new Date('1899-01-01T20:00:00');
      uInput = new UserInput();
      uInput.setStartTime(startAt12PM);
      uInput.setEndTime(endAt8PM);
    });

    it('should show two classes', () => {
      const results = MeetingTime.filter(classes, startAt12PM, endAt8PM);
      expect(results).toHaveLength(2);
    });
  });

  describe('when a user performs a search', () => {
    it('should return only active classes', () => {
      const activeClass = TestUtils.copyObject(classJson);
      const cancelledClass = TestUtils.copyObject(classJson);
      activeClass.classStatus = 'Active';
      cancelledClass.classStatus = 'Cancelled';
      expect(FilterClasses.filterByActiveClasses([activeClass, cancelledClass])).toHaveLength(1);
      const filteredClasses = FilterClasses.filterByActiveClasses([activeClass, cancelledClass]);
      expect(filteredClasses[0].classStatus).toEqual('Active');
    });
  });
});
