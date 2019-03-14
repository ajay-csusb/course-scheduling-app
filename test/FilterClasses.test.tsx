import { FilterClasses } from '../src/public/js/FilterClasses';
import { classJson, meetingDates, meetingTimes, classPDC, baseClassJson } from './ClassesJson';
import { IClass, IMeetingDate } from '../src/public/js/Class';
import { UserInput } from '../src/public/js/UserInput';
import { Instructor } from '../src/public/js/Instructor';
import { Subject, ISubject } from '../src/public/js/Subject';
// tslint:disable:max-line-length

let classes: IClass[] = [];
let subject: ISubject = {
  name: '',
  abbr: '',
};
let uInput: UserInput = new UserInput('both', meetingDates, subject, 'current', meetingTimes, 'all', '');
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

describe('filter by campus', () => {

  test('filter when both is checked', () => {
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('filter by San Bernardino campus', () => {
    uInput = new UserInput('san-bernardino', meetingDate, subject, 'current', meetingTimes, 'all', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

});

describe('filter by quarter', () => {
  test('filter by current quarters', () => {
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('filter by previous quarters', () => {
    uInput = new UserInput('both', meetingDate, subject, 'prev', meetingTimes, 'all', '');
    const results = FilterClasses.filter(classes, uInput);
    // @Todo fix this
    expect(localStorage.getItem).toBeCalledWith('prevQuarter');
  });

});

describe('filter by subject', () => {

  test('filter empty subject', () => {
    uInput = new UserInput('both', meetingDate, subject, 'current', meetingTimes, 'all', '');
    const results = Subject.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  test('filter accounting', () => {
    const acctSubject = subject;
    acctSubject.abbr = 'ACCT';
    uInput = new UserInput('both', meetingDate, acctSubject, 'current', meetingTimes, 'all', '');
    const results = Subject.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

});

describe('filter by day', () => {

  test('when all is checked', () => {
    meetingDate.all = true;
    classes = [];
    uInput = new UserInput('both', meetingDate, subject, 'current', meetingTimes, 'all', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('when monday is checked', () => {
    meetingDate.all = false;
    meetingDate.mon = true;
    const monday = meetingDate;
    classes = [];
    uInput = new UserInput('both', monday, subject, 'current', meetingTimes, 'all', '');
    classes.push(classJson);
    classes.push(classPDC);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  test('when monday and Tuesday is checked', () => {
    meetingDate.all = false;
    meetingDate.mon = true;
    const monTue = meetingDate;
    const TuesThurs = baseClassJson;
    Object.assign(TuesThurs, baseClassJson);
    TuesThurs.tues = 'Y';
    TuesThurs.thurs = 'Y';
    classes = [];
    uInput = new UserInput('both', monTue, subject, 'current', meetingTimes, 'all', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('when all and monday is checked', () => {
    meetingDate.all = true;
    meetingDate.mon = true;
    const monday = meetingDate;
    const TuesThurs = baseClassJson;
    Object.assign(TuesThurs, baseClassJson);
    TuesThurs.tues = 'Y';
    TuesThurs.thurs = 'Y';
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', monday, subject, 'current', meetingTimes, 'all', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('when no option is checked', () => {
    meetingDate.all = false;
    const noOption = meetingDate;
    classes = [];
    uInput = new UserInput('both', noOption, subject, 'current', meetingTimes, 'all', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

});

describe.skip('filter by time', () => {

});

describe('filter by instruction mode', () => {
  test('all classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, 'current', meetingTimes, 'all', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('online classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, 'current', meetingTimes, 'ol', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  test('in-person classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, 'current', meetingTimes, 'p', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

});

describe('filter by instructor', () => {
  test('when no input is given', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, 'current', meetingTimes, 'all', '');
    const results = Instructor.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  test('when valid  input is given', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, 'current', meetingTimes, 'all', 'Bakeman, Melissa');
    const results = Instructor.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });
});
