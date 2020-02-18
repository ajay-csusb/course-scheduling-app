import { TestUtils } from '../TestUtils';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { mount } from 'enzyme';

describe('GE classes(Semester) component snapshot', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('Given a GE classes(Semester) component', () => {
    test('snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      const geClassesSemComponent = classSearchContainerWrapper.find('.select-ge-sem-classes-attr');
      expect(geClassesSemComponent).toMatchSnapshot();
    });
  });

});
