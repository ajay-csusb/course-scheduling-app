import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { mount } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';

describe('test instructor autocomplete', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('initial state of instructor', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('instructorName')).toEqual('');
  });

});
