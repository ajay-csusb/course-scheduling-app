import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { TestUtils } from '../TestUtils';
import { Subject, ISubject } from '../../src/public/js/Subject';
// tslint:disable:max-line-length
describe('Subject autocomplete component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('Given a class search form', () => {
    test('subject component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const subjectWrapper = classSearchContainerWrapper.find('.search-autocomplete');
      expect(subjectWrapper).toMatchSnapshot();
    });
  });

});

describe('when a valid term and subjects are passed as an argument', () => {
  it('should return subjects related to that term', () => {
    const allSubjects = {
      1: [ {subject: 'bar', subject_DESC: 'Bar'}],
      2: [ {subject: 'baz', subject_DESC: 'Baz'}],
      3: [ {subject: 'foo', subject_DESC: 'Foo'}],
    };
    const selectedTerm = '3';
    const result = [{name: 'All', abbr: 'all'}, {name: 'Foo', abbr: 'foo'}];
    expect(Subject.getDropdownOptions(allSubjects, selectedTerm)).toEqual(result);
  });
});

describe('when a invalid term and subjects are passed as an argument', () => {
  it('should return All as an option', () => {
    const allSubjects = {
      1: [ {subject: 'bar', subject_DESC: 'Bar'}],
      2: [ {subject: 'baz', subject_DESC: 'Baz'}],
      3: [ {subject: 'foo', subject_DESC: 'Foo'}],
    };
    const selectedTerm = '4';
    const result = [{name: 'All', abbr: 'all'}];
    expect(Subject.getDropdownOptions(allSubjects, selectedTerm)).toEqual(result);
  });
});

describe('when a list of subjects are returned', () => {
  const allSubjects = {
    1: [ {subject: 'bar', subject_DESC: 'Bar'}],
    2: [
      {subject: 'aaa', subject_DESC: 'AAA'},
      {subject: 'foo', subject_DESC: 'Foo'},
      {subject: 'bar', subject_DESC: 'Bar'},
    ],
  };
  const expectedSubjects: ISubject[] = [
    {
      abbr: 'all',
      name: 'All',
    },
    {
      abbr: 'aaa',
      name: 'AAA',
    },
    {
      abbr: 'bar',
      name: 'Bar',
    },
    {
      abbr: 'foo',
      name: 'Foo',
    },
  ];
  const selectedTerm = '2';
  it('should return the subjects sorted by subject name', () => {
    expect(Subject.getDropdownOptions(allSubjects, selectedTerm)).toEqual(expectedSubjects);
  });
});
