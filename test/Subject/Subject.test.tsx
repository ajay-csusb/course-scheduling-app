import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('Subject autocomplete component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('subject component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const subjectWrapper = classSearchContainerWrapper.find('.search-autocomplete');
      expect(subjectWrapper).toMatchSnapshot();
    });
  });
});
