import * as React from 'react';
import fetchMock from 'fetch-mock';
import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';
import { classJson, rawClassesJson, baseClassJson} from './ClassesJson';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { mount, shallow } from 'enzyme';
import { TestUtils } from './TestUtils';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';
import { GeCourseAttribute } from '../src/public/js/GeCourseAttribute';
// tslint:disable:max-line-length

describe('Instruction mode values', () => {
  const classes = classJson;
  describe('when instruction mode is P', () => {
    it('should return Classroom', () => {
      expect(ClassSearchUtils.getInstructionMode(classes)).toEqual('Classroom');
    });
  });

  describe('when instruction mode is OL', () => {
    const onlineClasses = JSON.parse(JSON.stringify(classes));
    onlineClasses.instructionMode = 'OL';
    it('should return Online', () => {
      expect(ClassSearchUtils.getInstructionMode(onlineClasses)).toEqual('Online');
    });
  });

  describe('when instruction mode is CM', () => {
    const cmClasses = JSON.parse(JSON.stringify(classes));
    cmClasses.instructionMode = 'CM';
    it('should return Online CourseMatch Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(cmClasses)).toEqual('Online, Coursematch');
    });
  });

  describe('when instruction mode is FO', () => {
    const foClasses = JSON.parse(JSON.stringify(classes));
    foClasses.instructionMode = 'FO';
    it('should return Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)', () => {
      expect(ClassSearchUtils.getInstructionMode(foClasses)).toEqual('Fully Online (AB 386)');
    });
  });

  describe('when instruction mode is HO', () => {
    const hoClasses = JSON.parse(JSON.stringify(classes));
    hoClasses.instructionMode = 'HO';
    it('should return Hybrid Online Asynchronous and Synchronous Instruction ', () => {
      expect(ClassSearchUtils.getInstructionMode(hoClasses)).toEqual('Hybrid');
    });
  });

  describe('when instruction mode is HC', () => {
    const hcClasses = JSON.parse(JSON.stringify(classes));
    hcClasses.instructionMode = 'HC';
    it('should return Hybrid Classroom and Online Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(hcClasses)).toEqual('Hybrid');
    });
  });

  describe('when instruction mode is OC', () => {
    const ocClasses = JSON.parse(JSON.stringify(classes));
    ocClasses.instructionMode = 'OC';
    it('should return Off-Campus', () => {
      expect(ClassSearchUtils.getInstructionMode(ocClasses)).toEqual('Off-Campus');
    });
  });

  describe('when instruction mode is TO', () => {
    const toClasses = JSON.parse(JSON.stringify(classes));
    toClasses.instructionMode = 'TO';
    it('should return Televised Instruction (origination site)', () => {
      expect(ClassSearchUtils.getInstructionMode(toClasses)).toEqual('Televised (origination site)');
    });
  });

  describe('when instruction mode is TR', () => {
    const trClasses = JSON.parse(JSON.stringify(classes));
    trClasses.instructionMode = 'TR';
    it('should return Televised Instruction (receiving site)', () => {
      expect(ClassSearchUtils.getInstructionMode(trClasses)).toEqual('Televised (receiving site)');
    });
  });

  describe('when instruction mode is Z', () => {
    const zClasses = JSON.parse(JSON.stringify(classes));
    zClasses.instructionMode = 'Z';
    it('should return Zero Unit Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(zClasses)).toEqual('Zero Unit Instruction');
    });
  });

});

describe('Session code values', () => {
  describe('When Session code is 10W', () => {
    const classes10Weeks = JSON.parse(JSON.stringify(classJson));
    classes10Weeks.sessionCode = '10W';
    it('should return 10 Week', () => {
      expect(ClassSearchUtils.getSessionCode(classes10Weeks)).toEqual('10 Week');
    });
  });

  describe('When Session code is 1', () => {
    const classesRegWeeks = JSON.parse(JSON.stringify(classJson));
    classesRegWeeks.sessionCode = '1';
    it('should return Regular', () => {
      expect(ClassSearchUtils.getSessionCode(classesRegWeeks)).toEqual('Regular');
    });
  });

  describe('When Session code is 3W1', () => {
    it('should return 3 Week 1', () => {
      const classes31Weeks = TestUtils.copyObject(classJson);
      classes31Weeks.sessionCode = '3W1';
      expect(ClassSearchUtils.getSessionCode(classes31Weeks)).toEqual('3 Week 1');
    });
  });

  describe('When Session code is 6W1', () => {
    it('should return 6 Week 1', () => {
      const classes61Weeks = TestUtils.copyObject(classJson);
      classes61Weeks.sessionCode = '6W1';
      expect(ClassSearchUtils.getSessionCode(classes61Weeks)).toEqual('6 Week 1');
    });
  });

  describe('When Session code is 6W2', () => {
    it('should return 6 wWeek 2', () => {
      const classes62Weeks = TestUtils.copyObject(classJson);
      classes62Weeks.sessionCode = '6W2';
      expect(ClassSearchUtils.getSessionCode(classes62Weeks)).toEqual('6 Week 2');
    });
  });

});

describe('fetch parameters', () => {
  let classSearchContainerWrapper;
  beforeAll(() => {
    TestUtils.ajax();
  });

  beforeEach(() => {
    classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'bar',
        abbr: 'BAR',
      },
      instructorName: 'foo',
    });
  });

  test('fetch is called with correct URL on page load', () => {
    shallow(<ClassSearchContainer />);
    expect(fetchMock.lastUrl()).toMatch(new RegExp('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList'));
  });

  describe('when subject is updated', () => {
    it('should use correct parameters', () => {
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const subjectArgument = fetchMock.lastOptions();
      expect(subjectArgument.body).toMatch(new RegExp('"subject":"BAR"'));
    });
  });

  describe('when the request is logged ', () => {
    it('should call the correct URL to log the request', () => {
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(fetchMock.lastUrl()).toContain('/api/create/log');
    });

    it('should call the URL with correct paramters', () => {
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const fetchArgument = fetchMock.lastOptions();
      expect(fetchArgument.body).toContain('"subject":"BAR"');
      expect(fetchArgument.body).toContain('"name":"foo"');
    });
  });

  describe('when a user selects All in Subjects', () => {
    it('should make a request to get all subjects', () => {
      classSearchContainerWrapper.setState({
        subject: {
          name: 'All',
          abbr: 'all',
        },
      });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      classSearchContainerWrapper.update();
      const subjectArgument = fetchMock.lastOptions();
      expect(subjectArgument.body).toMatch(new RegExp('"subject":""'));
    });
  });

  describe('when instructor is set to All', () => {
    it('should pass empty value', () => {
      classSearchContainerWrapper.setState({
        instructorName: 'All',
      });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const instructorNameArgument = fetchMock.lastOptions();
      expect(instructorNameArgument.body).toMatch(new RegExp('"name":""'));
    });
  });

  describe('when instructor is updated', () => {
    it('should use correct value', () => {
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const instructorNameArgument = fetchMock.lastOptions();
      expect(instructorNameArgument.body).toMatch(new RegExp('"name":"foo"'));
    });
  });

  describe('when instructionMode is set', () => {
    it('should pass empty string', () => {
      classSearchContainerWrapper.find('.select-instruction-mode > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const instructionModeArgument = fetchMock.lastOptions();
      expect(instructionModeArgument.body).toMatch(new RegExp('"instruction_mode":""'));
    });
  });

  describe('when courseAttribute is set to all', () => {
    it('should pass an empty string', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'all' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const courseAttrArgument = fetchMock.lastOptions();
      expect(courseAttrArgument.body).toMatch(new RegExp('"crse_attr":""'));
    });
  });

  describe('when courseAttribute is set', () => {
    it('should pass the value without any changes', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'FOO' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const courseAttrArgument = fetchMock.lastOptions();
      expect(courseAttrArgument.body).toMatch(new RegExp('"crse_attr":"FOO"'));
    });
  });

  describe('when sessionCode is set to all', () => {
    it('should pass an empty string', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.session-code > select').simulate('change', { target: { value: 'all' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const sessionCodeArgument = fetchMock.lastOptions();
      expect(sessionCodeArgument.body).toMatch(new RegExp('"section_code":""'));
    });
  });

  describe('when sessionCode is set', () => {
    it('should pass the chosen value', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.session-code > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const sessionCodeArgument = fetchMock.lastOptions();
      expect(sessionCodeArgument.body).toMatch(new RegExp('"section_code":"foo"'));
    });
  });

  describe('when courseNo is set', () => {
    it('should pass the chosen value', () => {
      classSearchContainerWrapper.find('.course-number').simulate('change', { target: { value: '100' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const courseNoArgument = fetchMock.lastOptions();
      expect(courseNoArgument.body).toMatch(new RegExp('"catalog_nbr":"100"'));
    });
  });

  describe('when degreeType is set to all', () => {
    it('should pass an empty string', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'all' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const degreeTypeArgument = fetchMock.lastOptions();
      expect(degreeTypeArgument.body).toMatch(new RegExp('"acad_career":""'));
    });
  });

  describe('when degreeType is set', () => {
    it('should pass the chosen value', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'UGRD' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const degreeTypeArgument = fetchMock.lastOptions();
      expect(degreeTypeArgument.body).toMatch(new RegExp('"acad_career":"UGRD"'));
    });
  });

  describe('when classNo is set', () => {
    it('should pass the chosen value', () => {
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.class-number').simulate('change', { target: { value: '100' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const classNoArgument = fetchMock.lastOptions();
      expect(classNoArgument.body).toMatch(new RegExp('"class_nbr":"100"'));
    });
  });

  describe('when no meetingDay is set', () => {
    it('should not pass any value for days', () => {
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const meetingDayArgument = fetchMock.lastOptions();
      expect(meetingDayArgument.body).toMatch(new RegExp('"mon":"","tues":"","wed":"","thurs":"","fri":"","sat":"","sun":""'));
    });
  });

  describe('when Monday is set', () => {
    it('should pass value for Monday', () => {
      classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const meetingDayArgument = fetchMock.lastOptions();
      expect(meetingDayArgument.body).toMatch(new RegExp('"mon":"Y","tues":"","wed":"","thurs":"","fri":"","sat":"","sun":""'));
    });
  });

  describe('when Monday and Friday are set', () => {
    it('should pass values for Monday and Friday', () => {
      classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
      classSearchContainerWrapper.find('.fri > input').simulate('change', { target: { value: 'fri' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const meetingDayArgument = fetchMock.lastOptions();
      expect(meetingDayArgument.body).toMatch(new RegExp('"mon":"Y","tues":"","wed":"","thurs":"","fri":"Y","sat":"","sun":""'));
    });
  });

  describe('when campus is set to both', () => {
    it('should pass an empty string', () => {
      classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'both' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const campusArgument = fetchMock.lastOptions();
      expect(campusArgument.body).toMatch(new RegExp('"campus":""'));
    });
  });

  describe('when campus is set to San Bernardino', () => {
    it('should pass MAIN as a parameter', () => {
      classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'san-bernardino' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const campusArgument = fetchMock.lastOptions();
      expect(campusArgument.body).toMatch(new RegExp('"campus":"MAIN"'));
    });
  });

  describe('when campus is set to Palm Desert', () => {
    it('should pass PALM as a parameter', () => {
      classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'palm-desert' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const campusArgument = fetchMock.lastOptions();
      expect(campusArgument.body).toMatch(new RegExp('"campus":"PALM"'));
    });
  });

  describe('when term is set', () => {
    it('should pass the selected value', () => {
      classSearchContainerWrapper.find('.select-term > select').simulate('change', { target: { value: '1111' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const termArgument = fetchMock.lastOptions();
      expect(termArgument.body).toMatch(new RegExp('"strm":"1111"'));
    });
  });

  describe('when GE course attribute is set', () => {
    describe('and the term is quarter', () => {
      it('should pass the selected value', () => {
        classSearchContainerWrapper.find('#additional-filters').simulate('click');
        classSearchContainerWrapper.find('select#ge-classes-attributes').simulate('change', { target: { value: 'GE-Foo' } });
        classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
        const termArgument = fetchMock.lastOptions();
        expect(termArgument.body).toMatch(new RegExp('"crse_attr_value":"GE-Foo"'));
      });
    });
    describe('and the term in semester', () => {
      it('should pass GE as the value', () => {
        classSearchContainerWrapper.find('#additional-filters').simulate('click');
        classSearchContainerWrapper.find('select#ge-classes-attributes').simulate('change', { target: { value: 'Semester-Foo' } });
        classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
        const termArgument = fetchMock.lastOptions();
        expect(termArgument.body).toMatch(new RegExp('"crse_attr_value":"GE"'));
      });
    });
  });

  describe('when a user clicks submit, followed by reset, and submit again', () => {
    it('should unset parameters which are not explicitly set', () => {
      classSearchContainerWrapper.setState({
        subject: {
          name: 'All',
          abbr: 'all',
        },
        instructorName: 'John Doe',
        startTime: new Date('1899-01-01T11:00:00'),
        endTime: new Date('1899-01-01T19:00:00'),
      });
      classSearchContainerWrapper.find('.course-number').simulate('change', { target: { value: '100' } });
      classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'MAIN' } });
      classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
      classSearchContainerWrapper.find('.fri > input').simulate('change', { target: { value: 'fri' } });
      classSearchContainerWrapper.find('.select-instruction-mode > select').simulate('change', { target: { value: 'OL' } });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('.class-number').simulate('change', { target: { value: '2' } });
      classSearchContainerWrapper.find('.session-code > select').simulate('change', { target: { value: '3000' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
      classSearchContainerWrapper.setState({
        subject: {
          name: 'Chemistry',
          abbr: 'CHEM',
        },
      });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const fetchArgument = fetchMock.lastOptions();
      expect(fetchArgument.body).toMatch(new RegExp('"subject":"CHEM"'));
      expect(fetchArgument.body).toMatch(new RegExp('"catalog_nbr":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"name":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"campus":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"meeting_time_start":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"mon":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"tues":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"wed":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"thurs":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"fri":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"sat":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"sun":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"instruction_mode":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"crse_attr":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"class_nbr":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"section_code":""'));
    });
  });

  describe('when degree type is set and then unset', () => {
    it('fetch should be called with correct parameters', () => {
      classSearchContainerWrapper.setState({
        subject: {
          name: 'All',
          abbr: 'all',
        },
      });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'UGRD' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      let fetchArgument = fetchMock.lastOptions();
      expect(fetchArgument.body).toMatch(new RegExp('"crse_attr":""'));
      expect(fetchArgument.body).toMatch(new RegExp('"acad_career":"UGRD"'));
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      fetchArgument = fetchMock.lastOptions();
      expect(fetchArgument.body).toMatch(new RegExp('"crse_attr":"FOO"'));
      expect(fetchArgument.body).toMatch(new RegExp('"acad_career":""'));
    });
  });

});

describe('Degree type values', () => {
  describe('When the degree type value is UGRD', () => {
    const undergraduateClasses = JSON.parse(JSON.stringify(classJson));
    undergraduateClasses.degreeType = 'UGRD';
    it('should return Undergraduate', () => {
      expect(ClassSearchUtils.getDegreeType(undergraduateClasses)).toEqual('Undergraduate');
    });
  });

  describe('When the degree type value is PBAC', () => {
    const graduateClasses = JSON.parse(JSON.stringify(classJson));
    graduateClasses.degreeType = 'PBAC';
    it('should return Graduate', () => {
      expect(ClassSearchUtils.getDegreeType(graduateClasses)).toEqual('Graduate');
    });
  });

  describe('When the degree type value is EXED', () => {
    const openUniversityClasses = JSON.parse(JSON.stringify(classJson));
    openUniversityClasses.degreeType = 'EXED';
    it('should return Open University Course', () => {
      expect(ClassSearchUtils.getDegreeType(openUniversityClasses)).toEqual('Open University Course');
    });
  });
});

describe('Number of available seat', () => {
  describe('When no seats are available', () => {
    it('should return 0', () => {
      const zeroAvailableSeats = JSON.parse(JSON.stringify(classJson));
      zeroAvailableSeats.enrolledCapacity = 30;
      zeroAvailableSeats.enrolledTotal = 30;
      expect(ClassSearchUtils.getNoOfAvailableSeats(zeroAvailableSeats)).toEqual(0);
    });
  });

  describe('When seats are available', () => {
    it('should return number of seats', () => {
      const twoAvailableSeats = JSON.parse(JSON.stringify(classJson));
      twoAvailableSeats.enrolledCapacity = 30;
      twoAvailableSeats.enrolledTotal = 28;
      expect(ClassSearchUtils.getNoOfAvailableSeats(twoAvailableSeats)).toEqual(2);
    });
  });
});

describe('when a user performs a search', () => {
  describe('and two classes with different class numbers are displayed ', () => {
    it('should display two classes', () => {
      const result = ClassSearchUtils.mergeAttributes([classJson, baseClassJson]);
      expect(result).toHaveLength(2);
    });
  });

  describe('and two classes with same class number is displayed', () => {
    const copyOfClassJson = JSON.parse(JSON.stringify(classJson));
    it('should display one class', () => {
      const classes = ClassSearchUtils.mergeAttributes([classJson, copyOfClassJson]);
      expect(classes).toHaveLength(1);
    });
    it('should merge the course attributes', () => {
      classJson.courseAttr = 'foo';
      copyOfClassJson.courseAttr = 'bar';
      const classes = ClassSearchUtils.mergeAttributes([classJson, copyOfClassJson]);
      expect(classes[0].courseAttr).toEqual('foo, bar');
    });
    describe('if it is a General Education class', () => {
      it('should merge the General Education course attributes', () => {
        classJson.geCourseAttr = 'GE-BAZ';
        copyOfClassJson.geCourseAttr = '1';
        const classes = ClassSearchUtils.mergeAttributes([classJson, copyOfClassJson]);
        expect(classes[0].geCourseAttr).toEqual('GE-BAZ, 1');
      });
    });
  });
});

describe('when multiple classes are displayed in results', () => {
  const classAdm100 = JSON.parse(JSON.stringify(classJson));
  const classAdm200 = JSON.parse(JSON.stringify(classJson));
  const classBio100 = JSON.parse(JSON.stringify(classJson));
  const classBio200 = JSON.parse(JSON.stringify(classJson));
  let classes;
  beforeEach(() => {
    classAdm100.subject = 'ADM';
    classAdm100.catalogNo = '100';
    classAdm100.classSection = '01';
    classAdm200.subject = 'ADM';
    classAdm200.catalogNo = '200';
    classAdm200.classSection = '02';
    classBio100.subject = 'BIO';
    classBio100.catalogNo = '100';
    classBio100.classSection = '01';
    classBio200.subject = 'BIO';
    classBio200.catalogNo = '200';
    classBio200.classSection = '02';
    classes = ClassSearchUtils.sortClasses([classBio200, classAdm200, classAdm100, classBio100]);
  });

  it('should display the classes in ascending order of catalog number', () => {
    expect(classes[0].catalogNo).toEqual('100');
    expect(classes[1].catalogNo).toEqual('200');
    expect(classes[2].catalogNo).toEqual('100');
    expect(classes[3].catalogNo).toEqual('200');
  });

  it('should display the classes in ascending order of subject', () => {
    expect(classes[0].subject).toEqual('ADM');
    expect(classes[1].subject).toEqual('ADM');
    expect(classes[2].subject).toEqual('BIO');
    expect(classes[3].subject).toEqual('BIO');
  });

  it('should display the classes in ascending order of class section', () => {
    expect(classes[0].classSection).toEqual('01');
    expect(classes[1].classSection).toEqual('02');
    expect(classes[2].classSection).toEqual('01');
    expect(classes[3].classSection).toEqual('02');
  });
});

describe('when a class catalog number has numbers and characters', () => {
  const classAdm100A = TestUtils.copyObject(classJson);
  const classAdm100B = TestUtils.copyObject(classJson);
  const classBio200F = TestUtils.copyObject(classJson);
  const classBio200Z = TestUtils.copyObject(classJson);
  classAdm100A.catalogNo = '100A';
  classAdm100B.catalogNo = '100B';
  classBio200F.catalogNo = '200F';
  classBio200Z.catalogNo = '200Z';
  let classes;
  classes = ClassSearchUtils.sortClasses([classBio200Z, classAdm100B, classBio200F, classAdm100A]);
  it('should display the classes in ascending order of number first and then by characters', () => {
    expect(classes[0].catalogNo).toEqual('100A');
    expect(classes[1].catalogNo).toEqual('100B');
    expect(classes[2].catalogNo).toEqual('200F');
    expect(classes[3].catalogNo).toEqual('200Z');
  });

  describe('when two classes have the same catalog number and they contain numbers and character', () => {
    const classAdm100B1 = TestUtils.copyObject(classJson);
    const classAdm100B2 = TestUtils.copyObject(classJson);
    classAdm100B1.catalogNo = '100B';
    classAdm100B1.classSection = '01';
    classAdm100B2.catalogNo = '100B';
    classAdm100B2.classSection = '02';
    it('it should sort by class section', () => {
      classes = ClassSearchUtils.sortClasses([classAdm100B2, classAdm100B1]);
      expect(classes[0].classSection).toEqual('01');
      expect(classes[1].classSection).toEqual('02');
    });
  });

});

describe('when comparing two classes by catalog number, one having only numbers and the other having numbers and characters', () => {
  const classBio20B = TestUtils.copyObject(classJson);
  classBio20B.subject = 'BIO';
  classBio20B.catalogNo = '20B';
  const classBio200 = TestUtils.copyObject(classJson);
  classBio200.subject = 'BIO';
  classBio200.catalogNo = '200';
  let classes;
  it('should sort by ascending order of numbers first and the by characters', () => {
    classes = ClassSearchUtils.sortClasses([classBio200, classBio20B]);
    expect(classes[0].catalogNo).toEqual('20B');
    expect(classes[1].catalogNo).toEqual('200');
  });
});

describe('when class results are displayed', () => {
  it('should display the full description of the course attribute', () => {
    const classBio100 = JSON.parse(JSON.stringify(classJson));
    classBio100.courseAttr = 'GE';
    const classes = ClassSearchUtils.expandCourseAttribute(classBio100.courseAttr);
    expect(classes).toEqual('General Education');
  });

  describe('if the class has multiple attributes', () => {
    it('should display full description of all the course attributes', () => {
      const classBio200 = JSON.parse(JSON.stringify(classJson));
      classBio200.courseAttr = 'GE, CSLI';
      const expandedCourseAttr = ClassSearchUtils.expandCourseAttribute(classBio200.courseAttr);
      expect(expandedCourseAttr).toEqual('General Education, Service Learning');
    });

    it('should not display invalid attributes', () => {
      const classBio300 = JSON.parse(JSON.stringify(classJson));
      classBio300.courseAttr = 'WSTD, foo';
      const expandedCourseAttr = ClassSearchUtils.expandCourseAttribute(classBio300.courseAttr);
      expect(expandedCourseAttr).toEqual('Women\'s Studies');
    });

    it('should not display any information if all the attributes are invalid', () => {
      const classBio400 = JSON.parse(JSON.stringify(classJson));
      classBio400.courseAttr = 'foo, bar';
      const expandedCourseAttr = ClassSearchUtils.expandCourseAttribute(classBio400.courseAttr);
      expect(expandedCourseAttr).toEqual('');
    });

    it('should not display duplicate course attributes', () => {
      const classBio500 = TestUtils.copyObject(classJson);
      classBio500.courseAttr = 'GE, CSLI, GE';
      const expandedCourseAttr = ClassSearchUtils.expandCourseAttribute(classBio500.courseAttr);
      expect(expandedCourseAttr).toEqual('General Education, Service Learning');
    });
  });
});

describe('class status information', () => {
  describe('when the class has open seats', () => {
    const classBio100 = JSON.parse(JSON.stringify(classJson));
    classBio100.enrolledCapacity = 100;
    classBio100.enrolledTotal = 90;
    classBio100.enrollmentStatus = 'Open';
    const classes = ClassSearchUtils.getClassStatus(classBio100);
    it('should return Open', () => {
      expect(classes).toEqual('Open');
    });
  });

  describe('when the class has a waitlist', () => {
    const classBio200 = JSON.parse(JSON.stringify(classJson));
    classBio200.enrolledCapacity = 100;
    classBio200.enrolledTotal = 100;
    classBio200.waitlistCapacity = 60;
    classBio200.waitlistTotal = 10;
    classBio200.enrollmentStatus = 'Close';
    const classes = ClassSearchUtils.getClassStatus(classBio200);
    it('should return Waitlist', () => {
      expect(classes).toEqual('Waitlist');
    });
  });

  describe('when the class does not offer a waitlist', () => {
    const classBio250 = JSON.parse(JSON.stringify(classJson));
    classBio250.enrolledCapacity = 100;
    classBio250.enrolledTotal = 100;
    classBio250.waitlistCapacity = 0;
    classBio250.waitlistTotal = 0;
    classBio250.enrollmentStatus = 'Close';
    const classes = ClassSearchUtils.getClassStatus(classBio250);
    it('should return Closed', () => {
      expect(classes).toEqual('Closed');
    });
  });

  describe('when all the seats in waitlist are occupied', () => {
    const classBio275 = JSON.parse(JSON.stringify(classJson));
    classBio275.enrolledCapacity = 100;
    classBio275.enrolledTotal = 100;
    classBio275.waitlistCapacity = 60;
    classBio275.waitlistTotal = 60;
    classBio275.enrollmentStatus = 'Close';
    const classes = ClassSearchUtils.getClassStatus(classBio275);
    it('should return Closed', () => {
      expect(classes).toEqual('Closed');
    });
  });

  describe('when all the seats are occupied and there is no one on the waitlist', () => {
    const classBio300 = JSON.parse(JSON.stringify(classJson));
    classBio300.enrolledCapacity = 100;
    // If a class has a capacity of 'n' seats and
    // 'n-1' or 'n' seats are occupied then the class is considered 'closed'
    // or 'waitlisted'.
    classBio300.enrolledTotal = 100;
    classBio300.waitlistTotal = 0;
    classBio300.waitlistCapacity = 60;
    classBio300.enrollmentStatus = 'Close';
    const classes = ClassSearchUtils.getClassStatus(classBio300);
    it('should return Waitlist', () => {
      expect(classes).toEqual('Waitlist');
    });
  });

});

describe('GE class attribute', () => {
  const geAttrs = [
    { value: 'GE-FOO', label: 'General Education FOO' },
    { value: 'GE-BAR', label: 'General Education BAR' },
  ];

  describe('when a class with does not have a course attribute of General Education', () => {
    const classBio400 = JSON.parse(JSON.stringify(classJson));
    classBio400.courseAttr = 'FOO, BAR, BAZ, BUZZ';
    classBio400.geCourseAttr = '';
    const courseAttr = GeCourseAttribute.addGeAttrs(classBio400, geAttrs);
    it('should return classes with all the class attributes', () => {
      expect(courseAttr).toEqual('FOO, BAR, BAZ, BUZZ');
    });
  });

  describe('when a class is a General Education', () => {
    const classBio450 = JSON.parse(JSON.stringify(classJson));
    classBio450.courseAttr = 'General Education';
    classBio450.geCourseAttr = 'GE-FOO, bar, 1';

    const courseAttr = GeCourseAttribute.addGeAttrs(classBio450, geAttrs);
    it('should return classes with the correct GE attribute', () => {
      expect(courseAttr).toEqual('General Education FOO');
    });
  });

  describe('when a class has multiple course attributes', () => {
    const classBio500 = JSON.parse(JSON.stringify(classJson));
    classBio500.courseAttr = 'loreum, General Education, ipsum';
    classBio500.geCourseAttr = 'GE-BAR, 1, 2, 3';

    const courseAttr = GeCourseAttribute.addGeAttrs(classBio500, geAttrs);
    it('should return classes with all valid course attributes and dispaly GE course attribute', () => {
      expect(courseAttr).toEqual('loreum, ipsum, General Education BAR');
    });
  });

  describe('when a class has multiple GE course attributes', () => {
    const classBio600 = TestUtils.copyObject(classJson);
    classBio600.courseAttr = 'loreum, General Education, ipsum';
    classBio600.geCourseAttr = 'GE-BAR, 1, 2, 3, GE-FOO';

    const courseAttr = GeCourseAttribute.addGeAttrs(classBio600, geAttrs);
    it('should return all course attributes and multiple GE course attributes', () => {
      expect(courseAttr).toEqual('loreum, ipsum, General Education BAR, General Education FOO');
    });
  });

  describe('when a class has duplicate GE course attributes', () => {
    const classBio700 = TestUtils.copyObject(classJson);
    classBio700.courseAttr = 'General Education';
    classBio700.geCourseAttr = 'GE-FOO, GE-FOO';

    const geCourseAttr = GeCourseAttribute.addGeAttrs(classBio700, geAttrs);
    it('should not return duplicate GE course attributes', () => {
      expect(geCourseAttr).toEqual('General Education FOO');
    });
  });

  describe('when a class has duplicate GE course attributes and unique course attributes', () => {
    const classBio800 = TestUtils.copyObject(classJson);
    classBio800.courseAttr = 'General Education';
    classBio800.geCourseAttr = 'GE-FOO, GE-BAR, GE-FOO';

    const geCourseAttr = GeCourseAttribute.addGeAttrs(classBio800, geAttrs);
    it('should return all unique GE course attributes', () => {
      expect(geCourseAttr).toEqual('General Education FOO, General Education BAR');
    });
  });
});
