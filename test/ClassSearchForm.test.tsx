import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { TestUtils } from './TestUtils';
// tslint:disable:max-line-length

describe('Class search form', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('When a search is performed without entering subject', () => {
    let classSearchContainerWrapper = null;
    beforeEach(() => {
      classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    });

    it('should display error message', () => {
      expect(classSearchContainerWrapper.html()).toContain('Please select a Course Subject');
    });
  });

  describe('When a user selects a GE course attribute', () => {
    let searchFormComponent = null;
    describe('and does not select a subject', () => {
      beforeEach(() => {
        searchFormComponent = mount(<ClassSearchContainer />);
        searchFormComponent.find('#additional-filters').simulate('click');
        searchFormComponent.find('.select-ge-classes-attr select').simulate('change', {target: {value: 'foo'}});
        searchFormComponent.find('button[type="submit"]').simulate('click');
      });

      it('should display error message', () => {
        expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
      });
    });
  });
});
