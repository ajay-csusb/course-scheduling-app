import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { rawClassesJson } from './ClassesJson';
import { ContextMenu, Label } from '@blueprintjs/core';
import { ClassSearchForm } from '../src/public/js/ClassSearchForm';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';

describe('test class search form component', () => {

  beforeAll(() => {
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList', {});
    fetchMock.mock('https://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST', {});
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS', rawClassesJson);
  });

  test('Class search container component snapshot', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('fetch is called with correct URL on page load', () => {
    shallow(<ClassSearchContainer />);
    expect(fetchMock.lastUrl()).toMatch(new RegExp('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList'));
  });

  test.skip('request made to fetch classes when subject is changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.search-autocomplete input').prop('onItemSelect')();
    expect(fetchMock.lastUrl()).toMatch(new RegExp('https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS'));
  });

  test.skip('parameters used when request is to fetch classes when subject is changed', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        abbr: 'bar',
        name: 'Bar',
      },
    });
    const subjectArgument = fetchMock.lastOptions();
    expect(subjectArgument.body).toMatch(new RegExp('"subject":"BAR"'));
  });

  test('compare search form snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const classSearchFormWrapper = classSearchContainerWrapper.children().childAt(0);
    expect(classSearchFormWrapper).toMatchSnapshot();
  });

});

describe('test correct states are set', () => {
  describe('when an option is selected from course attribute', () => {
    it('should set the correct courseAttr state', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'ge' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.state('courseAttr')).toEqual('ge');
    });

    it.skip('should set the correct courseAttr props in ClassSearchResults component', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'ge' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      classSearchContainerWrapper.setState({
        isLoading: false,
        noClasses: true,
      });
      classSearchContainerWrapper.update();
      expect(classSearchContainerWrapper.find(ClassSearchResults).prop('courseAttr')).toEqual('ge');
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
});

describe('When user clicks submit', () => {
  it('sets isReset to false', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('isReset')).toBeFalsy();
  });

  it.skip('and subject is not selected then it should not show ClassSearchResultsComponent');
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

describe.skip('when a user selects All in Subjects', () => {
  let classSearchContainerWrapper = null;
  beforeAll(() => {
    classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'All',
        abbr: 'all',
      },
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
  });

  it('should make a request to get all subjects', () => {
    const subjectArgument = fetchMock.lastOptions();
    expect(subjectArgument.body).toMatch(new RegExp('"subject":""'));
  });

  it('should pass All as the subject props to ClassSearchResults component', () => {
    classSearchContainerWrapper.setState({
      isLoading: false,
    });
    const classSearchResultsWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(classSearchResultsWrapper.prop('subject')).toEqual({name: 'All', abbr: 'all'});
  });

  describe('When a search is performed which takes unusually long time', () => {
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

    it('should set beforeSubmit to false after submit is clicked', () => {
      expect(classSearchContainerWrapper.state('beforeSubmit')).toBeFalsy();
    });

    it('should set isLoading when submit is clicked', () => {
      expect(classSearchContainerWrapper.state('isLoading')).toBeTruthy();
    });

    it.skip('should display a loading indicator when submit is clicked', () => {
      const loadingWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
      expect(loadingWrapper.contains(<p>Loading...</p>)).toBeTruthy();
    });

    it.skip('should not display a loading indicator after subjects are updated and no classes are found', () => {
      classSearchContainerWrapper.setState({
        subject: {
          name: 'Foo',
          abbr: 'foo',
        },
        isLoading: false,
        noClasses: false,
      });
      const loadingWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
      expect(loadingWrapper.contains(<p>Loading...</p>)).toBeFalsy();
    });

    it.skip('should display no classes found message if noClasses is set', () => {
      classSearchContainerWrapper.setState({
        isLoading: false,
        noClasses: true,
      });
      const noClassesWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
      expect(noClassesWrapper.contains(<p>No classes found.</p>)).toBeTruthy();
    });

    it.skip('should display no classes found if no classes are found', () => {
      classSearchContainerWrapper.setState({
        subject: {
          name: 'Foo',
          abbr: 'foo',
        },
        isLoading: false,
        noClasses: false,
      });
      const noClassesWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
      expect(noClassesWrapper.contains(<p>No classes found.</p>)).toBeTruthy();
    });
  });

});
