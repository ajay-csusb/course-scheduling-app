import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('Instructor autocomplete component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('instructor component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const instructorWrapper = classSearchContainerWrapper.find('.search-instructor-autocomplete');
      expect(instructorWrapper).toMatchSnapshot();
    });
  });
});
