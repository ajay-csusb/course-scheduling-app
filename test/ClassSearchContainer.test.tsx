import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { Spinner } from '@blueprintjs/core';
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

  test('Class search form snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const classSearchFormWrapper = classSearchContainerWrapper.children().childAt(0);
    expect(classSearchFormWrapper).toMatchSnapshot();
  });

  test('Class search container with additional filters component snapshot', () => {
    const classSearchContainerComponent = mount(<ClassSearchContainer />);
    classSearchContainerComponent.find('#additional-filters').simulate('click');
    const classSearchContainerWithAdditionalFiltersComponent = classSearchContainerComponent.children().childAt(0);
    expect(classSearchContainerWithAdditionalFiltersComponent).toMatchSnapshot();
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
      classSearchContainerWrapper.find('.select-instruction-mode > select').simulate('change', { target: { value: 'foo' } });
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

  describe('when an option is selected from GE classes for Quarter', () => {
    it('should set the correct GE classes attribute state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.select-ge-classes-attr > select').simulate('change', { target: { value: 'GE-001' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('geClassesAttribute')).toEqual('GE-001');
    });
  });

  describe('when an option is selected from GE classes for Semester', () => {
    it('should set the correct state for GE classes attribute', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.select-ge-classes-sem-attr > select').simulate('change', { target: { value: 'GE-002' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('geClassesAttribute')).toEqual('GE-002');
    });
  });

  describe('When user clicks submit', () => {
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
      expect(classSearchContainerWrapper.state('subject')).toEqual({name: '', abbr: ''});
    });

    it('resets start time', () => {
      expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
    });

    it('resets end time', () => {
      expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
    });

    it('sets meetingDate to false', () => {
      expect(classSearchContainerWrapper.state('meetingDate')).toEqual(
        {
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

  it('sets the value of GE classes(Quarter) attribute to empty value', () => {
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    const geClassesAttrWrapper = classSearchContainerWrapper.find('#ge-classes-attributes');
    expect(geClassesAttrWrapper.at(0).prop('value')).toHaveLength(0);
  });

  it('sets the value of GE classes(Semester) attribute to empty value', () => {
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    const geClassesSemAttrWrapper = classSearchContainerWrapper.find('#ge-classes-sem-attributes');
    expect(geClassesSemAttrWrapper.at(0).prop('value')).toHaveLength(0);
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

  it('should display a loading indicator when submit is clicked', () => {
    const loadingWrapper = classSearchContainerWrapper.childAt(1);
    expect(loadingWrapper.find(Spinner)).toHaveLength(1);
  });

  it('should not display a loading indicator after isLoading is set to false', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
    });
    const loadingWrapper = classSearchContainerWrapper.childAt(1);
    expect(loadingWrapper.find(Spinner)).toHaveLength(0);
  });

  it('should display no classes found if no classes are found', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
      noClasses: true,
    });
    expect(classSearchContainerWrapper.html()).toContain('<p>0 classes found');
  });
});

describe('When a search is performed without entering subject', () => {
  let classSearchContainerWrapper = null;
  beforeEach(() => {
    classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
  });

  it('should display error message', () => {
    expect(classSearchContainerWrapper.html()).toContain('Please select a Subject');
  });

});
