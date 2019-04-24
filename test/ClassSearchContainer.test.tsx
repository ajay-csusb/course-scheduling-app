import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';

describe('test class search form component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('Class search form component snapshot', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('fetch is called with correct URL on page load', () => {
    shallow(<ClassSearchContainer />);
    expect(fetchMock.lastUrl()).toMatch(new RegExp('http://webdx.csusb.edu/ClassSchedule/getDropDownList'));
  });

  test('request made to fetch classes when subject is changed', () => {
    const classSearchContainerWrapper = shallow(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      subject: {
        abbr: 'foo',
        name: 'Foo',
      },
    });
    expect(fetchMock.lastUrl()).toMatch(new RegExp('http://webdx.csusb.edu/ClassSchedule/getCurrentCS'));
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
