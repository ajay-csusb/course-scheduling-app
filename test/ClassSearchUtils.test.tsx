import * as React from 'react';
import fetchMock from 'fetch-mock';
import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';
import { classJson, rawClassesJson} from './ClassesJson';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { mount, shallow } from 'enzyme';
import { TestUtils } from './TestUtils';
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
      expect(ClassSearchUtils.getInstructionMode(cmClasses)).toEqual('Online CourseMatch Instruction');
    });
  });

  describe('when instruction mode is FO', () => {
    const foClasses = JSON.parse(JSON.stringify(classes));
    foClasses.instructionMode = 'FO';
    it('should return Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)', () => {
      expect(ClassSearchUtils.getInstructionMode(foClasses)).toEqual('Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)');
    });
  });

  describe('when instruction mode is HO', () => {
    const hoClasses = JSON.parse(JSON.stringify(classes));
    hoClasses.instructionMode = 'HO';
    it('should return Hybrid Online Asynchronous and Synchronous Instruction ', () => {
      expect(ClassSearchUtils.getInstructionMode(hoClasses)).toEqual('Hybrid Online Asynchronous and Synchronous Instruction');
    });
  });

  describe('when instruction mode is HC', () => {
    const hcClasses = JSON.parse(JSON.stringify(classes));
    hcClasses.instructionMode = 'HC';
    it('should return Hybrid Classroom and Online Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(hcClasses)).toEqual('Hybrid Classroom and Online Instruction');
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
      expect(ClassSearchUtils.getInstructionMode(toClasses)).toEqual('Televised Instruction (origination site)');
    });
  });

  describe('when instruction mode is TR', () => {
    const trClasses = JSON.parse(JSON.stringify(classes));
    trClasses.instructionMode = 'TR';
    it('should return Televised Instruction (receiving site)', () => {
      expect(ClassSearchUtils.getInstructionMode(trClasses)).toEqual('Televised Instruction (receiving site)');
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

describe('Instruction name value', () => {
  const classes = classJson;

  describe('when instruction name is not empty', () => {
    it('should return instructor name', () => {
      expect(ClassSearchUtils.getInstructorName(classes)).toEqual('Dyck, Harold');
    });
  });

  describe('when instruction name is empty', () => {
    const noInstructorClass = JSON.parse(JSON.stringify(classes));
    noInstructorClass.instructorName = ' ';
    it('should return N/A', () => {
      expect(ClassSearchUtils.getInstructorName(noInstructorClass)).toEqual('N/A');
    });
  });
});

describe('Session code values', () => {
  describe('When Session code is 10W', () => {
    const classes10Weeks = JSON.parse(JSON.stringify(classJson));
    classes10Weeks.sessionCode = '10W';
    it('should return 10 weeks', () => {
      expect(ClassSearchUtils.getSessionCode(classes10Weeks)).toEqual('10 weeks');
    });
  });

  describe('When Session code is 12W', () => {
    const classes12Weeks = JSON.parse(JSON.stringify(classJson));
    classes12Weeks.sessionCode = '12W';
    it('should return 12 weeks', () => {
      expect(ClassSearchUtils.getSessionCode(classes12Weeks)).toEqual('12 weeks');
    });
  });

  describe('When Session code is MIN', () => {
    const classesMinWeeks = JSON.parse(JSON.stringify(classJson));
    classesMinWeeks.sessionCode = 'MIN';
    it('should return Mini', () => {
      expect(ClassSearchUtils.getSessionCode(classesMinWeeks)).toEqual('Mini');
    });
  });

  describe('When Session code is OSHER', () => {
    const classesOllWeeks = JSON.parse(JSON.stringify(classJson));
    classesOllWeeks.sessionCode = 'OLL';
    it('should return Osher', () => {
      expect(ClassSearchUtils.getSessionCode(classesOllWeeks)).toEqual('Osher');
    });
  });

  describe('When Session code is 1', () => {
    const classesRegWeeks = JSON.parse(JSON.stringify(classJson));
    classesRegWeeks.sessionCode = '1';
    it('should return Regular', () => {
      expect(ClassSearchUtils.getSessionCode(classesRegWeeks)).toEqual('Regular');
    });
  });

  describe('When Session code is RNS', () => {
    const classesRnsWeeks = JSON.parse(JSON.stringify(classJson));
    classesRnsWeeks.sessionCode = 'RNS';
    it('should return Regular Non Standard', () => {
      expect(ClassSearchUtils.getSessionCode(classesRnsWeeks)).toEqual('Regular Non Standard');
    });
  });

  describe('When Session code is SNS', () => {
    const classesSns = JSON.parse(JSON.stringify(classJson));
    classesSns.sessionCode = 'SNS';
    it('should return Self Non Standard', () => {
      expect(ClassSearchUtils.getSessionCode(classesSns)).toEqual('Self Non Standard');
    });
  });

  describe('When Session code is ES1', () => {
    const classesEs1 = JSON.parse(JSON.stringify(classJson));
    classesEs1.sessionCode = 'ESP1';
    it('should return ESP1', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs1)).toEqual('ESP1');
    });
  });

  describe('When Session code is ES1', () => {
    const classesEs1 = JSON.parse(JSON.stringify(classJson));
    classesEs1.sessionCode = 'ES1';
    it('should return ESP1', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs1)).toEqual('ESP1');
    });
  });

  describe('When Session code is ES2', () => {
    const classesEs2 = JSON.parse(JSON.stringify(classJson));
    classesEs2.sessionCode = 'ES2';
    it('should return ESP2', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs2)).toEqual('ESP2');
    });
  });

  describe('When Session code is ES3', () => {
    const classesEs3 = JSON.parse(JSON.stringify(classJson));
    classesEs3.sessionCode = 'ES3';
    it('should return ESP3', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs3)).toEqual('ESP3');
    });
  });

  describe('When Session code is ES4', () => {
    const classesEs4 = JSON.parse(JSON.stringify(classJson));
    classesEs4.sessionCode = 'ES4';
    it('should return ESP4', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs4)).toEqual('ESP4');
    });
  });

  describe('When Session code is one of the code for 3 weeks', () => {
    describe('When Session code is 3W1', () => {
      it('should return 3 weeks', () => {
        const classes31Weeks = JSON.parse(JSON.stringify(classJson));
        classes31Weeks.sessionCode = '3W1';
        expect(ClassSearchUtils.getSessionCode(classes31Weeks)).toEqual('3 weeks');
      });
    });
    describe('When Session code is 3W2', () => {
      it('should return 3 weeks', () => {
        const classes32Weeks = JSON.parse(JSON.stringify(classJson));
        classes32Weeks.sessionCode = '3W2';
        expect(ClassSearchUtils.getSessionCode(classes32Weeks)).toEqual('3 weeks');
      });
    });
    describe('When Session code is 3W3', () => {
      it('should return 3 weeks', () => {
        const classes33Weeks = JSON.parse(JSON.stringify(classJson));
        classes33Weeks.sessionCode = '3W3';
        expect(ClassSearchUtils.getSessionCode(classes33Weeks)).toEqual('3 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 4 weeks', () => {
    describe('When Session code is 4W1', () => {
      it('should return 4 weeks', () => {
        const classes41Weeks = JSON.parse(JSON.stringify(classJson));
        classes41Weeks.sessionCode = '4W1';
        expect(ClassSearchUtils.getSessionCode(classes41Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W2', () => {
      it('should return 4 weeks', () => {
        const classes42Weeks = JSON.parse(JSON.stringify(classJson));
        classes42Weeks.sessionCode = '4W2';
        expect(ClassSearchUtils.getSessionCode(classes42Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W3', () => {
      it('should return 4 weeks', () => {
        const classes43Weeks = JSON.parse(JSON.stringify(classJson));
        classes43Weeks.sessionCode = '4W3';
        expect(ClassSearchUtils.getSessionCode(classes43Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W4', () => {
      it('should return 4 weeks', () => {
        const classes44Weeks = JSON.parse(JSON.stringify(classJson));
        classes44Weeks.sessionCode = '4W4';
        expect(ClassSearchUtils.getSessionCode(classes44Weeks)).toEqual('4 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 6 weeks', () => {
    describe('When Session code is 6W1', () => {
      it('should return 6 weeks', () => {
        const classes61Weeks = JSON.parse(JSON.stringify(classJson));
        classes61Weeks.sessionCode = '6W1';
        expect(ClassSearchUtils.getSessionCode(classes61Weeks)).toEqual('6 weeks');
      });
    });
    describe('When Session code is 6W2', () => {
      it('should return 6 weeks', () => {
        const classes62Weeks = JSON.parse(JSON.stringify(classJson));
        classes62Weeks.sessionCode = '6W2';
        expect(ClassSearchUtils.getSessionCode(classes62Weeks)).toEqual('6 weeks');
      });
    });
    describe('When Session code is 6W3', () => {
      it('should return 6 weeks', () => {
        const classes63Weeks = JSON.parse(JSON.stringify(classJson));
        classes63Weeks.sessionCode = '6W3';
        expect(ClassSearchUtils.getSessionCode(classes63Weeks)).toEqual('6 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 8 weeks', () => {
    describe('When Session code is 8W1', () => {
      it('should return 8 weeks', () => {
        const classes81Weeks = JSON.parse(JSON.stringify(classJson));
        classes81Weeks.sessionCode = '8W1';
        expect(ClassSearchUtils.getSessionCode(classes81Weeks)).toEqual('8 weeks');
      });
    });
    describe('When Session code is 8W2', () => {
      it('should return 8 weeks', () => {
        const classes82Weeks = JSON.parse(JSON.stringify(classJson));
        classes82Weeks.sessionCode = '8W2';
        expect(ClassSearchUtils.getSessionCode(classes82Weeks)).toEqual('8 weeks');
      });
    });
  });

  describe('When Session code is one of the code for Self Support', () => {
    describe('When Session code is SSD', () => {
      it('should return Self Support', () => {
        const classesSsd = JSON.parse(JSON.stringify(classJson));
        classesSsd.sessionCode = 'SSD';
        expect(ClassSearchUtils.getSessionCode(classesSsd)).toEqual('Self Support');
      });
    });

    describe('When Session code is SD1', () => {
      it('should return Self Support', () => {
        const classesSd1 = JSON.parse(JSON.stringify(classJson));
        classesSd1.sessionCode = 'SD1';
        expect(ClassSearchUtils.getSessionCode(classesSd1)).toEqual('Self Support');
      });
    });

    describe('When Session code is SD2', () => {
      it('should return Self Support', () => {
        const classesSd2 = JSON.parse(JSON.stringify(classJson));
        classesSd2.sessionCode = 'SD2';
        expect(ClassSearchUtils.getSessionCode(classesSd2)).toEqual('Self Support');
      });
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

  describe('when instructionMode is set to all', () => {
    it('should pass empty string', () => {
      classSearchContainerWrapper.find('.select-instruction-mode > select').simulate('change', { target: { value: 'all' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const instructionModeArgument = fetchMock.lastOptions();
      expect(instructionModeArgument.body).toMatch(new RegExp('"instruction_mode":""'));
    });
  });

  describe('when instructionMode is set', () => {
    it('should use pass the value in uppercase', () => {
      classSearchContainerWrapper.find('.select-instruction-mode > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      const instructionModeArgument = fetchMock.lastOptions();
      expect(instructionModeArgument.body).toMatch(new RegExp('"instruction_mode":"FOO"'));
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
