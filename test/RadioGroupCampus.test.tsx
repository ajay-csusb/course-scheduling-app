import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';

describe('test radio group campus component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when campus are changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('campus')).toEqual('both');
    // tslint:disable-next-line:max-line-length
    classSearchContainerWrapper.find('.san-bernardino > input').simulate('change', { target: { value: 'san-bernardino' } });
    expect(classSearchContainerWrapper.state('campus')).toEqual('san-bernardino');
    // tslint:disable-next-line:max-line-length
    classSearchContainerWrapper.find('.palm-desert > input').simulate('change', { target: { value: 'palm-desert' } });
    expect(classSearchContainerWrapper.state('campus')).toEqual('palm-desert');
  });

});
