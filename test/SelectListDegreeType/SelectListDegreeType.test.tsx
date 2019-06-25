import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('<SelectListDegreeType>', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('SelectListDegreeType snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({
        subject: {
          abbr: 'bar',
          name: 'Bar',
        },
      });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      const degreeTypeWrapper = classSearchContainerWrapper.find('.select-degree-type');
      expect(degreeTypeWrapper).toMatchSnapshot();
    });
  });
});
