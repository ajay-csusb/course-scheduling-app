import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { ProgressBar } from '@blueprintjs/core';
import { TestUtils } from './TestUtils';
// tslint:disable:max-line-length

describe('snapshots', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('Class search container component snapshot', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('compare search form snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const classSearchFormWrapper = classSearchContainerWrapper.children().find('.container');
    expect(classSearchFormWrapper).toMatchSnapshot();
  });
});

describe('states', () => {
  describe('when an option is selected from course attribute', () => {
    it('should set the correct courseAttr state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'ge' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('courseAttr')).toEqual('ge');
    });
  });
  describe('when Undergraduate is selected from course attribute', () => {
    it('should set the correct state of degreeType', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'UGRD' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('degreeType')).toEqual('UGRD');
    });
  });
  describe('when class number is entered', () => {
    it('should set the correct classNo state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.class-number').simulate('change', { target: { value: '000' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('classNo')).toEqual('000');
    });
  });

  describe('when subject is not entered', () => {
    it('should set the showErrorMessage', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('showErrorMessage')).toBeTruthy();
    });
  });

  describe('when an option is selected from campus', () => {
    it('should set the correct state of campus', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('campus')).toEqual('foo');
    });
  });

  describe('when an option is selected from instruction mode', () => {
    it('should set the correct state of instructionMode', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper
        .find('.select-instruction-mode > select')
        .simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('instructionMode')).toEqual('foo');
    });
  });

  describe('when an option is selected from session code', () => {
    it('should set the correct state of sessionCode', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.session-code > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('sessionCode')).toEqual('foo');
    });
  });

  describe('when course number is entered', () => {
    it('should set the correct state of courseNumber', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('.course-number').simulate('change', { target: { value: '111' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('courseNo')).toEqual('111');
    });
  });

  describe('when an option is selected from term', () => {
    it('should set the correct term state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('.select-term > select').simulate('change', { target: { value: '000' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('term')).toEqual('000');
    });
  });

  describe('when an option is selected from GE classes', () => {
    it('should set the correct GE classes attribute state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper
        .find('.select-ge-classes-attr > select')
        .simulate('change', { target: { value: 'GE-001' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('geClassesAttribute')).toEqual('GE-001');
    });
  });

  describe('on component update', () => {
    it('should unset forceReload if it is set', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({ forceReload: true });
      expect(classSearchContainerWrapper.state('forceReload')).toBeFalsy();
    });
  });

  describe('when a user selects a meeting day', () => {
    it('should set the state for the day', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('input[value="mon"]').simulate('change');
      classSearchContainerWrapper.find('input[value="tue"]').simulate('change');
      classSearchContainerWrapper.find('input[value="wed"]').simulate('change');
      classSearchContainerWrapper.find('input[value="thu"]').simulate('change');
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('meetingDate')).toEqual({
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: false,
        sat: false,
        sun: false,
      });
    });
  });

  describe('when a user searches for classes open for enrollment', () => {
    it('should set the openClasses state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      expect(classSearchContainerWrapper.state('showOpenClasses')).toBeFalsy();
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.open-classes > input').simulate('change');
      expect(classSearchContainerWrapper.state('showOpenClasses')).toBeTruthy();
    });
  });

  describe('when a user searches for career level classes', () => {
    it('should set the correct states for career level classes', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      expect(classSearchContainerWrapper.state('careerLevelsOptions')).toEqual({
        ugrd: false,
        pbac: false,
      });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('input#ugrd').simulate('change');
      classSearchContainerWrapper.find('input#pbac').simulate('change');
      expect(classSearchContainerWrapper.state('careerLevelsOptions')).toEqual({ ugrd: true, pbac: true });
      classSearchContainerWrapper.find('input#ugrd').simulate('change');
      classSearchContainerWrapper.find('input#pbac').simulate('change');
      expect(classSearchContainerWrapper.state('careerLevelsOptions')).toEqual({
        ugrd: false,
        pbac: false,
      });
    });
  });

  describe('when a user filters classes by course levels', () => {
    it('should set the correct states for course levels', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      expect(classSearchContainerWrapper.state('courseLevelsOptions')).toEqual({
        1000: false,
        2000: false,
        3000: false,
        4000: false,
        5000: false,
        6000: false,
        7000: false,
      });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('input#three-thousand').simulate('change');
      classSearchContainerWrapper.find('input#seven-thousand').simulate('change');
      expect(classSearchContainerWrapper.state('courseLevelsOptions')).toEqual({
        1000: false,
        2000: false,
        3000: true,
        4000: false,
        5000: false,
        6000: false,
        7000: true,
      });
      classSearchContainerWrapper.find('input#thousand').simulate('change');
      classSearchContainerWrapper.find('input#three-thousand').simulate('change');
      classSearchContainerWrapper.find('input#six-thousand').simulate('change');
      classSearchContainerWrapper.find('input#seven-thousand').simulate('change');
      expect(classSearchContainerWrapper.state('courseLevelsOptions')).toEqual({
        1000: true,
        2000: false,
        3000: false,
        4000: false,
        5000: false,
        6000: true,
        7000: false,
      });
    });
  });

  describe('when user clicks submit', () => {
    let classSearchContainerWrapper = null;
    beforeEach(() => {
      classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({
        subject: {
          name: 'All',
          abbr: 'all',
        },
      });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    });
    it('sets isReset to false', () => {
      expect(classSearchContainerWrapper.state('isReset')).toBeFalsy();
    });
    it('sets beforeSubmit to false', () => {
      expect(classSearchContainerWrapper.state('beforeSubmit')).toBeFalsy();
    });
    it('should set isLoading when submit is clicked', () => {
      expect(classSearchContainerWrapper.state('isLoading')).toBeTruthy();
    });
    it('should set the progress to 0.1', () => {
      expect(classSearchContainerWrapper.state('progress')).toEqual(0.1);
    });
    it('should set the cssClasses.resultsWrapper to class-search-results-wrapper', () => {
      expect(classSearchContainerWrapper.state('cssClasses')).toEqual({
        resultsWrapper: 'class-search-results-wrapper',
      });
    });
  });

  describe('states on reset', () => {
    let classSearchContainerWrapper = null;
    beforeAll(() => {
      classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({
        term: '2222',
        subject: {
          name: 'Accounting',
          abbr: 'ACCT',
        },
        courseNo: '000',
        classNo: '1111',
        showOpenClasses: true,
        careerLevelOptions: {
          ugrd: true,
          pbac: true,
          exed: true,
        },
        courseLevelOptions: {
          1000: true,
          2000: true,
          3000: true,
          4000: true,
          5000: true,
          6000: true,
          7000: true,
        },
      });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      classSearchContainerWrapper.update();
      classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
    });

    it('sets isReset to false', () => {
      // isReset is first set to true then it is set to false.
      expect(classSearchContainerWrapper.state('isReset')).toBeFalsy();
    });

    it('sets courseNo state to empty value', () => {
      expect(classSearchContainerWrapper.state('courseNo')).toHaveLength(0);
    });

    it('sets the courseAttr to all', () => {
      expect(classSearchContainerWrapper.state('courseAttr')).toEqual('all');
    });

    it('sets the sessionCode to all', () => {
      expect(classSearchContainerWrapper.state('sessionCode')).toEqual('all');
    });

    it('unsets the classNo', () => {
      expect(classSearchContainerWrapper.state('classNo')).toEqual('');
    });

    it('sets campus to both', () => {
      expect(classSearchContainerWrapper.state('campus')).toEqual('both');
    });

    it('sets instructionMode to all', () => {
      expect(classSearchContainerWrapper.state('instructionMode')).toEqual('all');
    });

    it('sets degreeType to all', () => {
      expect(classSearchContainerWrapper.state('degreeType')).toEqual('all');
    });

    it('sets term to current term value', () => {
      expect(classSearchContainerWrapper.state('term')).toEqual('');
    });

    it('sets beforeSubmit to true', () => {
      expect(classSearchContainerWrapper.state('beforeSubmit')).toBeTruthy();
    });

    it('unsets subject name and abbreviation', () => {
      expect(classSearchContainerWrapper.state('subject')).toEqual({ name: '', abbr: '' });
    });

    it('resets start time', () => {
      expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
    });

    it('resets end time', () => {
      expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
    });

    it('sets meetingDate to false', () => {
      expect(classSearchContainerWrapper.state('meetingDate')).toEqual({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      });
    });

    it('unsets instructorName', () => {
      expect(classSearchContainerWrapper.state('instructorName')).toHaveLength(0);
    });

    it('sets geClasses to false', () => {
      expect(classSearchContainerWrapper.state('geClasses')).toBeFalsy();
    });

    it('unsets geClassesAttribute', () => {
      expect(classSearchContainerWrapper.state('geClassesAttribute')).toHaveLength(0);
    });

    it('sets isLoading to false', () => {
      expect(classSearchContainerWrapper.state('isLoading')).toBeFalsy();
    });

    it('sets showOpenClasses to false', () => {
      expect(classSearchContainerWrapper.state('showOpenClasses')).toBeFalsy();
    });

    it('sets careerLevelsOptions to false', () => {
      expect(classSearchContainerWrapper.state('careerLevelsOptions')).toEqual({
        ugrd: false,
        pbac: false,
      });
    });

    it('sets the courseLevelOptions to false', () => {
      expect(classSearchContainerWrapper.state('courseLevelsOptions')).toEqual({
        1000: false,
        2000: false,
        3000: false,
        4000: false,
        5000: false,
        6000: false,
        7000: false,
      });
    });

    it('sets the progress to 0', () => {
      expect(classSearchContainerWrapper.state('progress')).toEqual(0);
    });

    it('sets the cssClasses.resultsWrapper to undefined', () => {
      expect(classSearchContainerWrapper.state('cssClasses')).toEqual({ resultsWrapper: undefined });
    });
  });
});

describe('props on reset', () => {
  let classSearchContainerWrapper = null;
  beforeAll(() => {
    classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'Accounting',
        abbr: 'ACCT',
      },
      instructor: 'foo',
      courseNo: '000',
      classNo: '1111',
      geClassesAttribute: 'GE-000',
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
  });

  it('sets the value of course number input field to empty value', () => {
    const classSearchFormWrapper = classSearchContainerWrapper.find('.course-number');
    expect(classSearchFormWrapper.prop('value')).toHaveLength(0);
  });

  it('sets the value of class number input field to empty value', () => {
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    const classNumberWrapper = classSearchContainerWrapper.find('.class-number');
    expect(classNumberWrapper.prop('value')).toHaveLength(0);
  });

  it('sets the value of subject to empty value', () => {
    const subjectWrapper = classSearchContainerWrapper.find('.search-autocomplete input');
    expect(subjectWrapper.prop('value')).toHaveLength(0);
  });

  it('sets the value of instructor to empty value', () => {
    const instructorWrapper = classSearchContainerWrapper.find('.search-instructor-autocomplete input');
    expect(instructorWrapper.prop('value')).toHaveLength(0);
  });

  it('sets the value of GE classes attributes to empty value', () => {
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    const geClassesAttrWrapper = classSearchContainerWrapper.find('#ge-classes-attributes');
    expect(geClassesAttrWrapper.at(0).prop('value')).toHaveLength(0);
  });
});

describe('Loading message', () => {
  let classSearchContainerWrapper = null;
  beforeEach(() => {
    classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'All',
        abbr: 'all',
      },
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
  });

  it('should display a progress bar when submit is clicked', () => {
    const loadingWrapper = classSearchContainerWrapper.childAt(1);
    expect(loadingWrapper.find(ProgressBar)).toHaveLength(1);
  });

  it('should not display the progress bar after isLoading is set to false', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
    });
    const loadingWrapper = classSearchContainerWrapper.childAt(1);
    expect(loadingWrapper.find(ProgressBar)).toHaveLength(0);
  });

  it('should display no classes found if no classes are found', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
      noClasses: true,
    });
    expect(classSearchContainerWrapper.html()).toContain('<p>0 classes found');
  });
});
