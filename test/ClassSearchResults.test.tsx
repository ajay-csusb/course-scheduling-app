import { shallow, mount } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';
import { classJson, meetingDates, startMeetingTime, endMeetingTime, classPDC, baseClassJson } from './ClassesJson';
import { ClassSearchResults, IClassSearchResultsProps } from '../src/public/js/ClassSearchResults';
import { IClass, Class } from '../src/public/js/Class';
import { ISubject } from '../src/public/js/Subject';

const classes: IClass[] = [];
classes.push(classJson);
classes.push(classPDC);
classes.push(baseClassJson);
const subject: ISubject = {
  name: 'Accounting',
  abbr: 'ACCT',
};
describe('Given a class search results component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('When no classes are present', () => {
    it('should display the 0 classes in the message', () => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={[]}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
        />
      );
      const classSearchResultsWrapper = mount(classSearchResultsComponent);
      expect(classSearchResultsWrapper.html()).toContain('Found 0 classes');
    });
  });

  describe('When three classes are present', () => {
    it('should display the 3 classes in the message', () => {
      const onChangeOfLoadingMessage = jest.fn();
      const classSearchResultsComponent: JSX.Element = (
        <ClassSearchResults
          classes={classes}
          onChangeOfLoadingMessage={onChangeOfLoadingMessage}
        />
      );
      const classSearchResultsWrapper = mount(classSearchResultsComponent);
      expect(classSearchResultsWrapper.html()).toContain('Found 3 classes');
    });
  });

});
