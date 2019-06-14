import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe.skip('test control group meeting time component', () => {

    beforeAll(() => {
        fetchMock.mock('*', {});
    });

    test('start time by default', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T00:00:00'));
    });

    test('start time when hour arrow is clicked', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        classSearchContainerWrapper.find('.start-time span.bp3-timepicker-hour .bp3-icon-chevron-up').simulate('click', { target: { value: new Date('1899-01-01T08:00:00'} });
        expect(classSearchContainerWrapper.state('startTime')).toEqual(new Date('1899-01-01T08:00:00'));
    });

    test('end time by default', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T20:00:00'));
    });

    test('end time when hour arrow is clicked', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        classSearchContainerWrapper.find('.end-time span.bp3-timepicker-hour .bp3-icon-chevron-down').simulate('click', { target: { value: new Date('1899-01-01T08:00:00' } });
        expect(classSearchContainerWrapper.state('endTime')).toEqual(new Date('1899-01-01T19:00:00'));
    });

});
