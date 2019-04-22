import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { SelectListQuarter } from '../src/public/js/SelectListQuarter';
// tslint:disable:max-line-length
describe('test radio group quarter component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when quarter is changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('quarter')).toEqual('current');
    classSearchContainerWrapper.find('.prev-quarter').simulate('change');
    expect(classSearchContainerWrapper.state('quarter')).toEqual('prev');
  });

  test('state when quarter is toggled', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('.prev-quarter').simulate('change');
    expect(classSearchContainerWrapper.state('quarter')).toEqual('prev');
    classSearchContainerWrapper.find('.current-quarter').simulate('change');
    expect(classSearchContainerWrapper.state('quarter')).toEqual('current');
  });

  test('RadioGroupQuarter component snapshot', () => {
    const onChangeOfQuarter = jest.fn();
    const radioGroupQuarterWrapper = mount(<SelectListQuarter quarter="current" onChangeOfQuarter={onChangeOfQuarter} />);
    expect(radioGroupQuarterWrapper).toMatchSnapshot();
  });

});
