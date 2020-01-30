import { mount } from 'enzyme';
import * as React from 'react';
import { classJson, classPDC, baseClassJson } from './ClassesJson';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';
import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';

const classes: IClass[] = [];
classes.push(classJson);
classes.push(classPDC);
classes.push(baseClassJson);

describe('Given a class search results component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('When no classes are present', () => {
    it('should display the 0 classes in the message', () => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={[]}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
          currentTerm={'2194'}
        />
      );
      const classSearchResultsWrapper = mount(classSearchResultsComponent);
      expect(classSearchResultsWrapper.html()).toContain('0 classes found');
    });
  });

  describe('When two classes are present', () => {
    let classSearchResultsWrapper;
    baseClassJson.enrolledTotal = 30;
    beforeAll(() => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={[classJson, baseClassJson]}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
          currentTerm={'2194'}
        />
      );
      classSearchResultsWrapper = mount(classSearchResultsComponent);
    });
    it('should display the 3 classes in the message', () => {
      expect(classSearchResultsWrapper.html()).toContain('2 classes found');
    });

    it('should display the class status as Open', () => {
      expect(classSearchResultsWrapper.html()).toContain('Open');
    });

    it('should display the class status as Closed', () => {
      expect(classSearchResultsWrapper.html()).toContain('Closed');
    });

    it('should display the CSS class name as course-status--open', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--open');
    });

    it('should display the CSS class name as course-status--close', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
    });
  });

  describe('When classes from pervious terms are displayed', () => {
    let classSearchResultsWrapper;

    beforeAll(() => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={[classPDC]}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
          currentTerm={'2194'}
        />
      );
      classSearchResultsWrapper = mount(classSearchResultsComponent);
    });

    it('should display the class status as closed', () => {
      expect(classSearchResultsWrapper.html()).toContain('Closed');
      expect(classSearchResultsWrapper.html()).not.toContain('Open');
    });

    it('should display the approproate CSS classes', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
      expect(classSearchResultsWrapper.html()).not.toContain('course-status--open');
    });
  });
});
