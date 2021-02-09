import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { classJson } from './ClassesJson';
import * as OpenClassesFilter from '../src/public/js/OpenClassesFilter';
import _ from 'lodash';
import { app } from '../src/public/js/ClassSearch.d';

describe('Filter by open classes', () => {
  describe.each(getOpenClosedClassData())(`OpenClassesFilter.filter(%p, %p)`, (a, b, expected) => {
    it(`should return ${expected}`, () => {
      expect(OpenClassesFilter.filter(a, b)).toHaveLength(expected);

      if (expected !== 0) {
        const _class: IClass = OpenClassesFilter.filter(a, b)[0];
        expect(_class.subject).toEqual('BIOL');
      }
    });
  });
});

function getOpenClosedClassData() {
  const openClasses: IClass = TestUtils.copyObject(classJson);
  openClasses.enrollmentStatus = 'Open';
  openClasses.subject = 'BIOL';
  openClasses.quarter = app.state.currentTerm.toString();
  const closedClasses: IClass = TestUtils.copyObject(classJson);
  closedClasses.enrollmentStatus = 'Closed';
  const openClassCurrTerm: IClass = TestUtils.copyObject(classJson);
  openClassCurrTerm.enrollmentStatus = 'Open';
  openClassCurrTerm.quarter = '2208';
  openClassCurrTerm.subject = 'BIOL';
  const openClassPrevTerm: IClass = TestUtils.copyObject(classJson);
  openClassPrevTerm.enrollmentStatus = 'Open';
  openClassPrevTerm.quarter = '2206';
  const inactiveClass: IClass = TestUtils.copyObject(classJson);
  inactiveClass.classStatus = 'Closed';

  return [
    [[openClasses, closedClasses], false, 2],
    [[openClasses, closedClasses], true, 1],
    [[openClassCurrTerm, openClassPrevTerm], true, 1],
    [[openClasses, inactiveClass], true, 1],
    [[closedClasses, inactiveClass], true, 0],
    [[openClassCurrTerm, inactiveClass], true, 1],
    [[openClassPrevTerm, inactiveClass], true, 0],
  ];
}
