import { mount } from 'enzyme';
import * as React from 'react';
import { SelectListCourseAttr } from '../../src/public/js/SelectListCourseAttr';
// tslint:disable:max-line-length
describe('<SelectListCourseAttr>', () => {

  describe('Course attribute select list', () => {
    test('snapshot', () => {
      const courseAttributeSelectWrapper = mount(<SelectListCourseAttr courseAttr='all' onChangeOfCourseAttr={() => {}}/>);
      expect(courseAttributeSelectWrapper).toMatchSnapshot();
    });
  });
});
