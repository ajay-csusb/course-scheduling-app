import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { ClassSearchForm } from '../../src/public/js/ClassSearchForm';
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

    describe('when an option is selected from campus', () => {
      it('should set the correct prop in classSearchForm', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'foo' } });
        classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
        const classSearchFormWrapper = classSearchContainerWrapper.find(ClassSearchForm);
        expect(classSearchFormWrapper.prop('campus')).toEqual('foo');
      });

      it('should set the correct state of campus', () => {
        const classSearchContainerWrapper = mount(<ClassSearchContainer />);
        classSearchContainerWrapper.find('.campus-select > select').simulate('change', { target: { value: 'foo' } });
        classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
        expect(classSearchContainerWrapper.state('campus')).toEqual('foo');
      });
    });
  });
});
