import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('<SelectListComponent>', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const campusSelectWrapper = classSearchContainerWrapper.find('.campus-select');
      expect(campusSelectWrapper).toMatchSnapshot();
    });
  });
});
