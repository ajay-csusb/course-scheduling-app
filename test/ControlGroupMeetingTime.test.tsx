import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { TestUtils } from './TestUtils';
// tslint:disable:max-line-length
describe('test control group meeting time component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  test('start time by default', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
  });

  test('end time by default', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
  });

  test('start time and end time when reset is clicked', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.start-time .bp3-timepicker-hour').simulate('change', { target: { value: '09'} });
    classSearchContainerWrapper.find('.end-time .bp3-timepicker-hour').simulate('change', { target: { value: '08'} });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
    expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
    expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
  });

});
