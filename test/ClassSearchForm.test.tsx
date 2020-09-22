import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { TestUtils } from './TestUtils';
import { ClassSearchForm } from '../src/public/js/ClassSearchForm';
// tslint:disable:max-line-length

describe('Class search form', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('when a search is performed without entering subject', () => {
    it('should display error message', () => {
      let classSearchContainerWrapper = null;
      classSearchContainerWrapper = mount(<ClassSearchContainer />);
      classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
      expect(classSearchContainerWrapper.html()).toContain('Please select a Course Subject');
    });
  });

  describe('when a user selects a GE course attribute', () => {
    let searchFormComponent = null;

    describe('and does not select a subject', () => {
      it('should not display error message', () => {
        searchFormComponent = mount(<ClassSearchContainer />);
        searchFormComponent.find('#additional-filters').simulate('click');
        searchFormComponent.find('.select-ge-classes-attr select').simulate('change', { target: { value: 'foo' } });
        searchFormComponent.find('button[type="submit"]').simulate('click');
        expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
      });
    });
  });

  describe('when a user check Open Classes status box', () => {
    let searchFormComponent = null;

    describe('and does not select a subject', () => {
      it('should not display error message', () => {
        searchFormComponent = mount(<ClassSearchContainer />);
        searchFormComponent.find('#additional-filters').simulate('click');
        searchFormComponent.find('.open-classes input').simulate('change');
        searchFormComponent.find('button[type="submit"]').simulate('click');
        expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
      });
    });
  });

  describe('when a user selects options from Career Levels checkboxes', () => {
    let searchFormComponent = null;

    describe('and does not select a subject', () => {
      describe('when one option is checked', () => {
        it('should not display error message', () => {
          searchFormComponent = mount(<ClassSearchContainer />);
          searchFormComponent.find('#additional-filters').simulate('click');
          searchFormComponent.find('input#pbac').simulate('change');
          searchFormComponent.find('button[type="submit"]').simulate('click');
          expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
        });
      });

      describe('when two options are checked', () => {
        it('should not display error message', () => {
          searchFormComponent = mount(<ClassSearchContainer />);
          searchFormComponent.find('#additional-filters').simulate('click');
          searchFormComponent.find('input#ugrd').simulate('change');
          searchFormComponent.find('input#pbac').simulate('change');
          searchFormComponent.find('button[type="submit"]').simulate('click');
          expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
        });
      });
    });
  });

  describe('when a user selects options from Course Levels checkboxes', () => {
    let searchFormComponent = null;

    describe('and does not select a subject', () => {
      describe('when one option is checked', () => {
        it('should not display error message', () => {
          searchFormComponent = mount(<ClassSearchContainer />);
          searchFormComponent.find('#additional-filters').simulate('click');
          searchFormComponent.find('input#five-thousand').simulate('change');
          searchFormComponent.find('button[type="submit"]').simulate('click');
          expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
        });
      });

      describe('when two options are checked', () => {
        it('should not display error message', () => {
          searchFormComponent = mount(<ClassSearchContainer />);
          searchFormComponent.find('#additional-filters').simulate('click');
          searchFormComponent.find('input#four-thousand').simulate('change');
          searchFormComponent.find('input#five-thousand').simulate('change');
          searchFormComponent.find('button[type="submit"]').simulate('click');
          expect(searchFormComponent.html()).not.toContain('Please select a Course Subject');
        });
      });
    });
  });

  describe('When a user performs a search', () => {
    let searchFormComponent = null;
    let classSearchContainerComponent = null;

    beforeAll(() => {
      classSearchContainerComponent = mount(<ClassSearchContainer />);
      searchFormComponent = classSearchContainerComponent.find(ClassSearchForm);
    });

    it('should have the correct default prop values', () => {
      expect(searchFormComponent.prop('openClasses')).toBeFalsy();
      expect(searchFormComponent.prop('careerLevelsOptions')).toEqual({ ugrd: false, pbac: false, exed: false });
      expect(searchFormComponent.prop('courseLevelsOptions')).toEqual({
        1000: false,
        2000: false,
        3000: false,
        4000: false,
        5000: false,
        6000: false,
        7000: false,
      });
    });

    it('should pass the correct props to class search form component', () => {
      classSearchContainerComponent.find('#additional-filters').simulate('click');
      classSearchContainerComponent.find('.open-classes > input').simulate('change');
      classSearchContainerComponent.find('input#ugrd').simulate('change');
      classSearchContainerComponent.find('input#pbac').simulate('change');
      classSearchContainerComponent.find('input#exed').simulate('change');
      classSearchContainerComponent.find('input#thousand').simulate('change');
      classSearchContainerComponent.find('input#seven-thousand').simulate('change');
      classSearchContainerComponent.find('button[type="submit"]').simulate('click');
      searchFormComponent = classSearchContainerComponent.find(ClassSearchForm);

      expect(searchFormComponent.prop('openClasses')).toBeTruthy();
      expect(searchFormComponent.prop('careerLevelsOptions')).toEqual({ ugrd: true, pbac: true, exed: true });
      expect(searchFormComponent.prop('courseLevelsOptions')).toEqual({
        1000: true,
        2000: false,
        3000: false,
        4000: false,
        5000: false,
        6000: false,
        7000: true,
      });
    });
  });
});
