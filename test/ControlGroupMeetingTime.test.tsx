import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('test control group meeting time component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('start time by default', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
  });

  test('start time when hour arrow is clicked', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.start-time span.bp3-timepicker-hour .bp3-icon-chevron-up').simulate('click');
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T01:00:00'));
  });

  test('end time by default', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
  });

  test('end time when hour arrow is clicked', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.end-time span.bp3-timepicker-hour .bp3-icon-chevron-down').simulate('click');
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T22:00:00'));
  });

  test('start time and end time when reset is clicked', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.start-time span.bp3-timepicker-hour .bp3-icon-chevron-up').simulate('click');
    classSearchContainerWrapper.find('.end-time span.bp3-timepicker-hour .bp3-icon-chevron-down').simulate('click');
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.find('button[type="reset"]').simulate('click');
    expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
    expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T23:00:00'));
  });

});
