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
        />
      );
      const classSearchResultsWrapper = mount(classSearchResultsComponent);
      expect(classSearchResultsWrapper.html()).toContain('0 classes found');
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
      expect(classSearchResultsWrapper.html()).toContain('3 classes found');
    });
  });

});
