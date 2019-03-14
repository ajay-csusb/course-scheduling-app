import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';

describe('test control group meeting time component', () => {

    beforeAll(() => {
        fetchMock.mock('*', {});
    });

    test('state when all meeting times are checked', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        const resultObj = {
            afterNoon: false,
            all: true,
            beforeNoon: false,
            evening: false,
        };
        expect(classSearchContainerWrapper.state('meetingTime')).toEqual(resultObj);
        // tslint:disable-next-line:max-line-length
        classSearchContainerWrapper.find('.before-noon > input').simulate('change', { target: { value: 'before-noon' } });
        resultObj.beforeNoon = true;
        resultObj.all = false;
        expect(classSearchContainerWrapper.state('meetingTime')).toEqual(resultObj);
        classSearchContainerWrapper.find('.after-noon > input').simulate('change', { target: { value: 'after-noon' } });
        resultObj.afterNoon = true;
        expect(classSearchContainerWrapper.state('meetingTime')).toEqual(resultObj);
        classSearchContainerWrapper.find('.evening > input').simulate('change', { target: { value: 'evening' } });
        resultObj.evening = true;
        expect(classSearchContainerWrapper.state('meetingTime')).toEqual(resultObj);
    });

    test('all is set to false when other option is checked in meeting time', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        const resultObj = {
            afterNoon: false,
            all: true,
            beforeNoon: false,
            evening: false,
        };
        // tslint:disable-next-line:max-line-length
        classSearchContainerWrapper.find('.before-noon > input').simulate('change', { target: { value: 'before-noon' } });
        // tslint:disable-next-line:max-line-length
        classSearchContainerWrapper.find('.before-noon > input').simulate('change', { target: { value: 'before-noon' } });
        resultObj.beforeNoon = false;
        resultObj.all = false;
        expect(classSearchContainerWrapper.state('meetingTime')).toEqual(resultObj);
    });

});
