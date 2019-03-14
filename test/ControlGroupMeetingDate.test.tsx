import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';

describe('test control group meeting date component', () => {

    beforeAll(() => {
        fetchMock.mock('*', {});
    });

    test('state when all is checked in meeting date', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        const resultObj = {
            all: true,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
        };
        expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
        classSearchContainerWrapper.find('.all-date > input').simulate('change', { target: { value: 'all' } });
        resultObj.all = false;
        expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
    });

    test('all is set to false when other option is checked in meeting date', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        const resultObj = {
            all: false,
            mon: true,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
        };
        classSearchContainerWrapper.find('.mon > input').simulate('change', { target: { value: 'mon' } });
        expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
    });

    test('multiple states are checked in meeting date', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        const resultObj = {
            all: false,
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
        expect(classSearchContainerWrapper.state('meetingDate')).toEqual(resultObj);
    });
});
