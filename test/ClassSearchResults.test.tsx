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

  describe('When no classes are displayed in the results', () => {
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

  describe('When a user searches for a class and two classes are displayed', () => {
    let classSearchResultsWrapper;
    classJson.enrolledTotal = 27;
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

    it('should display the 2 classes in the message', () => {
      expect(classSearchResultsWrapper.html()).toContain('2 classes found');
    });

    it('should display the class status as Open', () => {
      expect(classSearchResultsWrapper.html()).toContain('Open');
    });

    it('should display the number of available seats as 3', () => {
      const markup = '<div class="course-availability">Available Seats <span>3</span></div>';
      expect(classSearchResultsWrapper.html()).toContain(markup);
    });

    it('should display the CSS class name as course-status--open', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--open');
    });

  });

  describe('When a user searches for classes which are are not open for enrollment', () => {
    let classSearchResultsWrapper;
    baseClassJson.enrolledTotal = 30;
    beforeAll(() => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={[baseClassJson]}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
          currentTerm={'2194'}
        />
      );
      classSearchResultsWrapper = mount(classSearchResultsComponent);
    });

    it('should display the class status as Closed', () => {
      expect(classSearchResultsWrapper.html()).toContain('Closed');
    });

    it('should display the CSS class name as course-status--close', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
    });

    it('should not display available seats for classes which are closed', () => {
      const noOfAvailableSeatsMarkup = classSearchResultsWrapper.find('.course-availability');
      expect(noOfAvailableSeatsMarkup).toHaveLength(0);
    });

  });

  describe('When a user searches for classes from the pervious term', () => {
    let classSearchResultsWrapper;
    classPDC.quarter = '000';
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
    });

    it('should display the approproate CSS classes', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
    });

    it('should not display available seats markup', () => {
      const noOfAvailableSeatsMarkup = classSearchResultsWrapper.find('.course-availability');
      expect(noOfAvailableSeatsMarkup).toHaveLength(0);
    });
  });
});
