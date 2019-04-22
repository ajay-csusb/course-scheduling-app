import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('test radio group campus component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when campus are changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('campus')).toEqual('both');
    classSearchContainerWrapper.find('.san-bernardino').simulate('change');
    expect(classSearchContainerWrapper.state('campus')).toEqual('san-bernardino');
    classSearchContainerWrapper.find('.palm-desert').simulate('change');
    expect(classSearchContainerWrapper.state('campus')).toEqual('palm-desert');
  });

});
