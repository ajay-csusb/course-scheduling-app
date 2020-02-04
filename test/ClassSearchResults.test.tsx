import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { classJson, classPDC, baseClassJson } from './ClassesJson';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';
import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';

const classes: IClass[] = [];
classes.push(classJson);
classes.push(classPDC);
classes.push(baseClassJson);

function mountClassSearchResultsComponent(results: IClass[], term: string = '2194'): ReactWrapper {
  const onChangeOfLoadingMessage = jest.fn();
  const classSearchResultsComponent: JSX.Element = (
    <ClassSearchResults
      classes={results}
      onChangeOfLoadingMessage={onChangeOfLoadingMessage}
      currentTerm={term}
    />
  );
  return mount(classSearchResultsComponent);
}

describe('Given a class search results component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('When no classes are displayed in the results', () => {
    it('should display the 0 classes in the message', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent([]);
      expect(classSearchResultsWrapper.html()).toContain('0 classes found');
    });
  });

  describe('When a user searches for a class and two classes are displayed', () => {
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      classJson.enrolledTotal = 27;
      classSearchResultsWrapper = mountClassSearchResultsComponent([classJson, baseClassJson]);
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
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      baseClassJson.enrolledTotal = 30;
      classSearchResultsWrapper = mountClassSearchResultsComponent([baseClassJson]);
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
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      classPDC.quarter = '000';
      classSearchResultsWrapper = mountClassSearchResultsComponent([classPDC]);
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

  describe('when a user searches for a class which has a waitlist', () => {
    it('should display the number of students in the waitlist', () => {
      const results = mountClassSearchResultsComponent([baseClassJson]);
      expect(results.text()).toContain('Waitlist: 1');
    });

    describe('if the class has no waitlist', () => {
      it('should display the text No Waitlist', () => {
        baseClassJson.enrolledTotal = 30;
        baseClassJson.waitlistCapacity = 0;
        const results = mountClassSearchResultsComponent([baseClassJson]);
        expect(results.text()).toContain('No Waitlist');
      });
    });

    describe('if the class is open', () => {
      it('should not display the text Waitlist', () => {
        baseClassJson.enrolledCapacity = 30;
        baseClassJson.enrolledTotal = 20;
        const results = mountClassSearchResultsComponent([baseClassJson]);
        expect(results.text()).not.toContain('Waitlist');
      });
    });
  });

});
