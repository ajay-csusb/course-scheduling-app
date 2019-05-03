import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { rawClassesJson } from './ClassesJson';

describe('test class search form component', () => {

  beforeAll(() => {
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/getDropDownList', {});
    fetchMock.mock('https://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST', {});
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/getCurrentCS', rawClassesJson);
  });

  test('Class search container component snapshot', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('fetch is called with correct URL on page load', () => {
    shallow(<ClassSearchContainer />);
    expect(fetchMock.lastUrl()).toMatch(new RegExp('https://webdx.csusb.edu/ClassSchedule/getDropDownList'));
  });

  test('request made to fetch classes when subject is changed', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        abbr: 'foo',
        name: 'Foo',
      },
    });
    expect(fetchMock.lastUrl()).toMatch(new RegExp('https://webdx.csusb.edu/ClassSchedule/getCurrentCS'));
  });

  test('parameters used when request is to fetch classes when subject is changed', () => {
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
  test('showGeClasses state when a user sets it', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.ge-classes > input').simulate('change');
    expect(classSearchContainerWrapper.state('showGeClasses')).toBeTruthy();
  });

  test('showGeClasses state when a user unsets it', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.ge-classes > input').simulate('change');
    classSearchContainerWrapper.find('.ge-classes > input').simulate('change');
    expect(classSearchContainerWrapper.state('showGeClasses')).toBeFalsy();
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

  it('sets isReset to false', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
    expect(classSearchContainerWrapper.state('isReset')).toBeFalsy();
  });

  it.skip('unsets classes props in ClassSearchResults component', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'Accounting',
        abbr: 'ACCT',
      },
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
    let classSearchResultsWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(classSearchResultsWrapper.prop('classes')).not.toHaveLength(0);
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
    classSearchContainerWrapper.update();
    classSearchResultsWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(classSearchResultsWrapper.prop('classes')).toHaveLength(0);
  });
});

describe('when a user selects All in Subjects', () => {
  it('should make a request to get all subjects', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
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

  it('should pass All as the subject props to ClassSearchResults component', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        name: 'All',
        abbr: 'all',
      },
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
    const classSearchResultsWrapper = classSearchContainerWrapper.childAt(0).childAt(1);
    expect(classSearchResultsWrapper.prop('subject')).toEqual({name: 'All', abbr: 'all'});
  });

});
