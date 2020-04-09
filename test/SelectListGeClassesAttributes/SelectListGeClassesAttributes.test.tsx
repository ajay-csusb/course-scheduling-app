import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { TestUtils } from '../TestUtils';
import { IOptionProps } from '@blueprintjs/core';
import { ISelectListGeClassesAttributesProps, SelectListGeClassesAttributes } from '../../src/public/js/SelectListGeClassesAttributes';
// tslint:disable:max-line-length
describe('GE classes attributes component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('Given a select list for GE course attributes', () => {
    test('snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('#additional-filters').simulate('click');
      const geClassesAttributes = classSearchContainerWrapper.find('.select-ge-classes-attr');
      expect(geClassesAttributes).toMatchSnapshot();
    });
  });

  const geAttrs: IOptionProps[] = [
    { value: '', label: 'All' },
    { value: 'ge-foo', label: 'GE-FOO' },
    { value: 'bar', label: 'BAR' },
  ];

  describe('and Fall 2020 is selected as a term', () => {
    it('should display options related to semester term', () => {
      const geAttrsProps: ISelectListGeClassesAttributesProps = {
        currentTerm: '2208',
        geClassesAttributes: geAttrs,
        geClassesAttribute: 'ge-foo',
        onChangeOfGeClassesAttribute: jest.fn(),
      };
      const selectListGeClassesAttributesWrapper = mount(<SelectListGeClassesAttributes {...geAttrsProps} />);
      expect(selectListGeClassesAttributesWrapper.html()).toContain('GE-A1 Oral Communication');
      expect(selectListGeClassesAttributesWrapper.html()).not.toContain('GE-FOO');
      expect(selectListGeClassesAttributesWrapper.html()).toMatchSnapshot();
    });
  });

  describe('and Summer 2020 is selected as a term', () => {
    it('should display options related to quarter term', () => {
      const geAttrsProps: ISelectListGeClassesAttributesProps = {
        currentTerm: '2207',
        geClassesAttributes: geAttrs,
        geClassesAttribute: '',
        onChangeOfGeClassesAttribute: jest.fn(),
      };
      const geAttrsComponent = mount(<SelectListGeClassesAttributes {...geAttrsProps} />);
      expect(geAttrsComponent.html()).toContain('GE-FOO');
      expect(geAttrsComponent.html()).not.toContain('GE-A1 Oral Communication');
      expect(geAttrsComponent.html()).toMatchSnapshot();
    });
  });
});
