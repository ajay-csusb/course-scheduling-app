import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { mount } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';
import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';

describe('test meeting times', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('initial state of instructor', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('instructorName')).toEqual('');
  });

});

describe('compare start times', () => {

  test('user entered time is before the class time', () => {
    const data = [
      ['8:00 AM', '9:00 AM'],
      ['8:00 AM', '6:00 PM'],
      ['8:15 AM', '8:30 AM'],
      ['8:15 AM', '8:30 PM'],
      ['12:00 AM', '12:00 PM'],
      ['12:10 AM', '12:20 PM'],
      ['9:00 AM', '12:00 AM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });
  });

  test('user entered time and class time is after noon', () => {
    const data = [
      ['10:00 PM', '8:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
      expect(result).toBeFalsy();
    });
    const data1 = [
      ['12:00 PM', '10:00 PM'],
    ];
    data1.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });

  });

  test('user entered start time is same as the class start time', () => {
    const data = [
      ['8:00 AM', '8:00 AM'],
      ['8:10 AM', '8:10 AM'],
      ['8:10 PM', '8:10 PM'],
      ['9:00 PM', '9:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });
  });

  describe('user entered start time is after the class start time', () => {

    test('classes are before noon', () => {
      const data = [
        ['8:00 AM', '6:00 AM'],
        ['8:30 AM', '7:00 AM'],
        ['8:30 AM', '8:15 AM'],
        ['9:00 PM', '9:00 AM'],
        ['9:30 PM', '9:30 AM'],
        ['7:00 PM', '9:45 AM'],
        ['7:00 PM', '9:45 AM'],
      ];
      data.forEach(_data => {
        const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
        expect(result).toBeFalsy();
      });
    });

    test('classes are at around noon', () => {
      const data = [
        ['5:00 PM', '12:00 PM'],
        ['10:30 PM', '12:00 PM'],
        ['12:20 PM', '12:15 PM'],
        ['7:00 PM', '12:30 PM'],
        ['8:20 PM', '12:45 PM'],
      ];
      data.forEach(_data => {
        const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
        expect(result).toBeFalsy();
      });
    });
  });

  test('classes are in the evening', () => {
    const data = [
      ['9:00 PM', '6:00 PM'],
      ['8:30 PM', '8:15 PM'],
      ['10:00 PM', '8:30 PM'],
      ['9:30 PM', '9:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareStartTimes(_data[0], _data[1]);
      expect(result).toBeFalsy();
    });
  });

});

describe('compare end times', () => {

  test('user entered end time is before the class end time', () => {
    const data = [
      ['8:00 AM', '9:00 AM'],
      ['8:00 AM', '9:00 PM'],
      ['8:15 AM', '8:30 AM'],
      ['8:15 AM', '8:30 PM'],
      ['12:00 AM', '12:00 PM'],
      ['12:10 AM', '12:20 PM'],
      ['9:50 AM', '8:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareEndTimes(_data[0], _data[1]);
      expect(result).toBeFalsy();
    });
  });

  test('user entered end time and class end time is after noon', () => {
    const data = [
      ['10:00 PM', '8:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareEndTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });
    const data1 = [
      ['12:00 PM', '10:00 PM'],
    ];
    data1.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareEndTimes(_data[0], _data[1]);
      expect(result).toBeFalsy();
    });

  });

  test('user entered end time is same as the class end time', () => {
    const data = [
      ['8:00 AM', '8:00 AM'],
      ['8:10 AM', '8:10 AM'],
      ['8:10 PM', '8:10 PM'],
      ['9:00 PM', '9:00 PM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareEndTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });
  });

  test('user entered end time is after the class end time', () => {
    const data = [
      ['8:20 AM', '8:20 AM'],
      ['9:00 AM', '8:00 AM'],
      ['8:00 PM', '8:00 AM'],
      ['8:00 PM', '7:50 PM'],
      ['8:30 AM', '8:15 AM'],
      ['12:00 PM', '12:00 AM'],
      ['12:20 PM', '12:10 PM'],
      ['11:00 PM', '9:50 AM'],
      ['8:00 PM', '9:50 AM'],
    ];
    data.forEach(_data => {
      const result: boolean = ClassSearchUtils.compareEndTimes(_data[0], _data[1]);
      expect(result).toBeTruthy();
    });
  });
});
