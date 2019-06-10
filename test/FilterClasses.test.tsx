import { FilterClasses } from '../src/public/js/FilterClasses';
import { classJson, meetingDates, startMeetingTime, endMeetingTime, classPDC, baseClassJson } from './ClassesJson';
import { IClass, IMeetingDate } from '../src/public/js/Class';
import { UserInput } from '../src/public/js/UserInput';
import { Instructor } from '../src/public/js/Instructor';
import { Subject, ISubject } from '../src/public/js/Subject';
import { MeetingTime } from '../src/public/js/MeetingTime';
import { CourseNumber } from '../src/public/js/CourseNumber';
// tslint:disable:max-line-length

let classes: IClass[] = [];
let subject: ISubject = {
  name: '',
  abbr: '',
};
let uInput: UserInput = new UserInput('both', meetingDates, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
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

describe('Filter classes by campus', () => {
  const campusClasses = [];
  beforeAll(() => {
    const palmDesertClass = JSON.parse(JSON.stringify(baseClassJson));
    palmDesertClass.campus = 'PALM';
    const mainCampusClass = JSON.parse(JSON.stringify(baseClassJson));
    mainCampusClass.campus = 'MAIN';
    campusClasses.push(classJson);
    campusClasses.push(palmDesertClass);
    campusClasses.push(mainCampusClass);
  });

  describe('When both is selected', () => {
    it('should show all classes', () => {
      uInput = new UserInput('both', meetingDates, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
      const results = FilterClasses.filter(campusClasses, uInput);
      expect(results).toHaveLength(3);
    });
  });

  describe('When San Bernardino is selected', () => {
    it('should show one class', () => {
      uInput = new UserInput('san-bernardino', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
      const results = FilterClasses.filter(campusClasses, uInput);
      expect(results).toHaveLength(2);
    });
  });

  describe('When Palm Desert is selected', () => {
    it('should show only one class', () => {
      uInput = new UserInput('palm-desert', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
      const results = FilterClasses.filter(campusClasses, uInput);
      expect(results).toHaveLength(1);
    });

  });
});

describe('filter by quarter', () => {
  test('filter by current quarters', () => {
    uInput = new UserInput('san-bernardino', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('filter by previous quarters', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'prev', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    // @Todo fix this
    expect(localStorage.getItem).toBeCalledWith('prevQuarter');
  });

});

describe('filter by subject', () => {

  test('filter empty subject', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = Subject.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  test('filter accounting', () => {
    const acctSubject = subject;
    acctSubject.abbr = 'ACCT';
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = Subject.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show all classes if All is selected as a subject', () => {
    const allSubject = subject;
    allSubject.name = 'All';
    allSubject.abbr = 'all';
    uInput = new UserInput('both', meetingDate, allSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = Subject.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

});

describe('filter by day', () => {

  test('when all is checked', () => {
    meetingDate.all = true;
    classes = [];
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
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
    uInput = new UserInput('both', monday, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
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
    uInput = new UserInput('both', monTue, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
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
    uInput = new UserInput('both', monday, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('when no option is checked', () => {
    meetingDate.all = false;
    const noOption = meetingDate;
    classes = [];
    uInput = new UserInput('both', noOption, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

});

describe('filter by instruction mode', () => {
  test('all classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  test('online classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, '', 'current', startMeetingTime, endMeetingTime, 'ol', '', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  test('in-person classes', () => {
    classes = [];
    uInput = new UserInput('both', meetingDates, subject, '', 'current', startMeetingTime, endMeetingTime, 'p', '', '');
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

});

describe('when classes are filtered by instructor', () => {
  beforeAll(() => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');

  });

  it('should return all classes if no input is given', () => {
    const results = Instructor.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  it('should return all classes if "All" is selected', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'All', '');
    const results = Instructor.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  it('should return one class when Melissa Bakeman is selected as an instructor', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'Bakeman, Melissa', '');
    const results = Instructor.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

});

describe.only('when classes are filtered by meeting time', () => {
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
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
  });

  describe('when start time and end time is not set', () => {
    // it('should show all classes', () => {
      // const results = FilterClasses.filter(classes, uInput);
      // expect(results).toHaveLength(4);
    // });

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
      uInput = new UserInput('both', meetingDate, subject, '', 'current', startAt12PM, endAt11PM, 'all', '', '');
    });

    // it('should show three classes', () => {
    //   const results = FilterClasses.filter(classes, uInput);
    //   expect(results).toHaveLength(3);
    // });

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
      uInput = new UserInput('both', meetingDate, subject, '', 'current', startAt8AM, endAt12PM, 'all', '', '');
    });

    // it('should show one class', () => {
    //   const results = FilterClasses.filter(classes, uInput);
    //   expect(results).toHaveLength(1);
    // });

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
      uInput = new UserInput('both', meetingDate, subject, '', 'current', startAt1130AM, endAt945PM, 'all', '', '');
    });

    // it('should show two class', () => {
    //   const results = FilterClasses.filter(classes, uInput);
    //   expect(results).toHaveLength(2);
    // });

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
      uInput = new UserInput('both', meetingDate, subject, '', 'current', startAt10PM, endAt12AM, 'all', '', '');
    });

    // it('should not show any classes', () => {
    //   const results = FilterClasses.filter(classes, uInput);
    //   expect(results).toHaveLength(0);
    // });

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
      uInput = new UserInput('both', meetingDate, subject, '', 'current', startAt12PM, endAt8PM, 'all', '', '');
    });

    // it('should show two classes', () => {
    //   const results = FilterClasses.filter(classes, uInput);
    //   expect(results).toHaveLength(2);
    // });

    it('should show two classes', () => {
      const results = MeetingTime.filter(classes, startAt12PM, endAt8PM);
      expect(results).toHaveLength(2);
    });
  });

});

describe('test filter by course number', () => {
  test('when correct course number is entered', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, '468', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = CourseNumber.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  test.skip('when course number partially matches user input', () => {
    // @Todo this will pass when the filter classes by quarter issue
    // is fixed.
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, '1', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = CourseNumber.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  test('when invalid course number is entered', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, 'foo', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = CourseNumber.filter(classes, uInput);
    expect(results).toHaveLength(0);
  });

  test('when no course number is entered', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = CourseNumber.filter(classes, uInput);
    expect(results).toHaveLength(3);
  });

  test('when other filters are involved', () => {
    classes = [];
    classes.push(classJson);
    classes.push(classPDC);
    classes.push(baseClassJson);
    uInput = new UserInput('both', meetingDate, subject, '101', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

});

describe('when multiple filters are selected', () => {
  const acctSubject: ISubject = subject;
  beforeAll(() => {
    classes = [];
    acctSubject.abbr = 'ACCT';
    acctSubject.name = 'Accounting';
    const acctClass = JSON.parse(JSON.stringify(baseClassJson));
    acctClass.subject = 'ACCT';
    acctClass.courseAttr = 'FOO,GE,BAR,BAZ';
    classes.push(acctClass);
    classes.push(classPDC);
    classes.push(classJson);
  });

  it('should show two classes if only Accounting is selected', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  it('should show one class when Melissa Bakeman is selected', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'Bakeman, Melissa', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show one class when filtered by subject and instructor', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'Dyck, Harold', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show one class when filtered by subject, course number and instructor', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '101', 'current', startMeetingTime, endMeetingTime, 'all', 'Dyck, Harold', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show all classes if GE is not set', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  it('should show one class if filtered by instructor', () => {
    uInput = new UserInput('both', meetingDate, subject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'Bakeman, Melissa', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show one class if filtered by instructor, subject', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'Bakeman, Melissa', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(1);
  });

  it('should show all classes if user has not selected an instructor', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  it('should show all classes if user has selected an instructor as All', () => {
    uInput = new UserInput('both', meetingDate, acctSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', 'All', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

  it('should show all classes if All is selected as a subject', () => {
    const allSubject: ISubject = subject;
    allSubject.abbr = 'all';
    allSubject.name = 'All';
    uInput = new UserInput('both', meetingDate, allSubject, '', 'current', startMeetingTime, endMeetingTime, 'all', '', '');
    const results = FilterClasses.filter(classes, uInput);
    expect(results).toHaveLength(2);
  });

});
