import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('<SelectListCourseAttr>', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.setState({
        subject: {
          abbr: 'bar',
          name: 'Bar',
        },
      });
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      const courseAttributeSelectWrapper = classSearchContainerWrapper.find('.course-attribute');
      classSearchContainerWrapper.find('.course-attribute > select').simulate('change', { target: { value: 'foo' } });
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(courseAttributeSelectWrapper).toMatchSnapshot();
    });
  });
});
