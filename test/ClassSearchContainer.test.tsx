import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { rawClassesJson } from './ClassesJson';
// tslint:disable:max-line-length

describe('snapshots', () => {

  beforeAll(() => {
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList', {});
    fetchMock.mock('https://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST', {});
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS', rawClassesJson);
  });

  test('Class search container component snapshot', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('compare search form snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const classSearchFormWrapper = classSearchContainerWrapper.children().childAt(0);
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

  describe('when Degree type is selected', () => {
    it('should set the correct state of degreeType', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.select-degree-type > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('degreeType')).toEqual('foo');
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
    it('sets beforeSubmit to true', () => {
      expect(classSearchContainerWrapper.state('beforeSubmit')).toBeFalsy();
    });
    it('should set isLoading when submit is clicked', () => {
      expect(classSearchContainerWrapper.state('isLoading')).toBeTruthy();
    });
  });

  describe('When user clicks reset', () => {
    let classSearchContainerWrapper = null;
    beforeAll(() => {
      classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({
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
      courseNo: '000',
      classNo: '1111',
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
  });

  it('sets courseNo props to empty value', () => {
    const classSearchFormWrapper = classSearchContainerWrapper.childAt(0).childAt(0);
    expect(classSearchFormWrapper.prop('courseNo')).toHaveLength(0);
  });

  it('sets classNo props to empty value', () => {
    const classSearchFormWrapper = classSearchContainerWrapper.childAt(0).childAt(0);
    expect(classSearchFormWrapper.prop('classNo')).toHaveLength(0);
  });

  it('sets the value of course number input field to empty value', () => {
    const classSearchFormWrapper = classSearchContainerWrapper.find('.course-number');
    expect(classSearchFormWrapper.prop('value')).toHaveLength(0);
  });

  it('sets the value of class number input field to empty value', () => {
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    const classSearchFormWrapper = classSearchContainerWrapper.find('.class-number');
    expect(classSearchFormWrapper.prop('value')).toHaveLength(0);
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
    const loadingWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(loadingWrapper.contains(<p>Loading...</p>)).toBeTruthy();
  });

  it('should not display a loading indicator after isLoading is set to false', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
    });
    const loadingWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(loadingWrapper.contains(<p>Loading...</p>)).toBeFalsy();
  });

  it('should display no classes found if no classes are found', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
      noClasses: true,
    });
    expect(classSearchContainerWrapper.html()).toContain('<p>Found 0 classes');
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
