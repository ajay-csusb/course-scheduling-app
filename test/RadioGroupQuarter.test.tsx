import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { RadioGroupQuarter } from '../src/public/js/RadioGroupQuarter';
// tslint:disable:max-line-length
describe('test radio group quarter component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when quarter is changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('quarter')).toEqual('current');
    classSearchContainerWrapper.find('input[value="prev"]').simulate('change', { target: { value: 'prev' } });
    expect(classSearchContainerWrapper.state('quarter')).toEqual('prev');
  });

  test('states when quarters are changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('input[value="prev"]').simulate('change', { target: { value: 'prev' } });
    expect(classSearchContainerWrapper.state('quarter')).toEqual('prev');
    classSearchContainerWrapper.find('input[value="prev"]').simulate('change', { target: { value: 'current' } });
    expect(classSearchContainerWrapper.state('quarter')).toEqual('current');
  });

  test('RadioGroupQuarter component snapshot', () => {
    const onChangeOfQuarter = jest.fn();
    const radioGroupQuarterWrapper = mount(<RadioGroupQuarter quarter="current" onChangeOfQuarter={onChangeOfQuarter} />);
    expect(radioGroupQuarterWrapper).toMatchSnapshot();
  });

});
