import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';

describe('test control group meeting date component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when no option is checked in meeting day', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const resultObj = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
  });

  test('when monday is checked in meeting date', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const resultObj = {
      mon: true,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
    classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
  });

  test('multiple days are checked in meeting date', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    const resultObj = {
      mon: true,
      tue: false,
      wed: true,
      thu: false,
      fri: false,
      sat: false,
      sun: true,
    };
    classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
    classSearchContainerWrapper.find('.wed > input').simulate('change', { target: { value: 'wed' } });
    classSearchContainerWrapper.find('.sun > input').simulate('change', { target: { value: 'sun' } });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
  });
});
