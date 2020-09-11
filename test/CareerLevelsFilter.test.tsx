import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { classJson, careerLevelOptions } from './ClassesJson';
import * as CareerLevelsFilter from '../src/public/js/CareerLevelsFilter';
import _ from 'lodash';

describe('Filter by career level classes', () => {
  describe.each(getCareerLevelsClassData())(`CareerLevelsFilter.filter(%p, %p)`, (a, b, length, order) => {
    it(`should return ${length} classes`, () => {
      const result = CareerLevelsFilter.filter(a, b);
      expect(result).toHaveLength(length);

      for (let i = 0; i < order.length; i++) {
        const _class: IClass = result[i];
        expect(_class.subject).toEqual(order[i]);
      }
    });
  });
});

function getCareerLevelsClassData() {
  const ugrdClass: IClass = TestUtils.copyObject(classJson);
  ugrdClass.degreeType = 'UGRD';
  ugrdClass.subject = 'BIOL';
  const pbacClass: IClass = TestUtils.copyObject(classJson);
  pbacClass.degreeType = 'PBAC';
  pbacClass.subject = 'ACCT';
  const exedClass: IClass = TestUtils.copyObject(classJson);
  exedClass.degreeType = 'EXED';
  exedClass.subject = 'CHEM';
  const pbac = TestUtils.copyObject(careerLevelOptions);
  _.set(pbac, 'pbac', true);
  const twoOptions = TestUtils.copyObject(careerLevelOptions);
  _.set(twoOptions, 'ugrd', true);
  _.set(twoOptions, 'exed', true);
  const allOptions = TestUtils.copyObject(careerLevelOptions);
  _.set(allOptions, 'ugrd', true);
  _.set(allOptions, 'pbac', true);
  _.set(allOptions, 'exed', true);

  return [
    [[ugrdClass, pbacClass, exedClass], careerLevelOptions, 3, ['BIOL', 'ACCT', 'CHEM']],
    [[ugrdClass, pbacClass, exedClass], pbac, 1, ['ACCT']],
    [[ugrdClass, pbacClass, exedClass], twoOptions, 2, ['BIOL', 'CHEM']],
    [[ugrdClass, pbacClass, exedClass], allOptions, 3, ['BIOL', 'ACCT', 'CHEM']],
  ];
}
