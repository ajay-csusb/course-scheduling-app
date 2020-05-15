import * as Sort from '../src/public/js/Sort';
import { classJson } from './ClassesJson';
import { TestUtils } from './TestUtils';

describe('sorting classes', () => {
  let bioClass;
  let acctClass;
  beforeEach(() => {
    acctClass = TestUtils.copyObject(classJson);
    acctClass.subject = 'ACCT';
    acctClass.instructorName = 'Doe';
    acctClass.classSection = '02';
    acctClass.classNumber = 200;
    bioClass = TestUtils.copyObject(classJson);
    bioClass.subject = 'BIOL';
    bioClass.instructorName = 'John';
    bioClass.classSection = '01';
    bioClass.classNumber = 100;
  });

  describe('sort by string', () => {
    test('default sort by string behavior', () => {
      const results = Sort.sortByString([bioClass, acctClass]);
      expect(results[0].subject).toEqual('ACCT');
      expect(results[1].subject).toEqual('BIOL');
    });

    test('sort by string in descending format', () => {
      const results = Sort.sortByString([bioClass, acctClass], 'desc');
      expect(results[0].subject).toEqual('BIOL');
      expect(results[1].subject).toEqual('ACCT');
    });

    test('sort by string using instructor name as the key', () => {
      const results = Sort.sortByString([bioClass, acctClass], 'asc', 'instructorName');
      expect(results[0].instructorName).toEqual('Doe');
      expect(results[1].instructorName).toEqual('John');
    });
  });

  describe('sort by int', () => {
    test('default sorting behavior', () => {
      const sortedClasses = Sort.sortByInt([acctClass, bioClass]);
      expect(sortedClasses[0].classSection).toEqual('01');
      expect(sortedClasses[1].classSection).toEqual('02');
    });

    test('sort in descending order', () => {
      const descSortedClasses = Sort.sortByInt([acctClass, bioClass], 'desc');
      expect(descSortedClasses[0].classSection).toEqual('02');
      expect(descSortedClasses[1].classSection).toEqual('01');
    });

    test('sort by class number', () => {
      const classNumberSortClasses = Sort.sortByInt([acctClass, bioClass], 'asc', 'classNumber'); 
      expect(classNumberSortClasses[0].classNumber).toEqual(100);
      expect(classNumberSortClasses[1].classNumber).toEqual(200);
    });
  });

});
