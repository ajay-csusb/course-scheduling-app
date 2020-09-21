import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { classJson, courseLevelsOptions } from './ClassesJson';
import * as CourseLevelsFilter from '../src/public/js/CourseLevelsFilter';
import _ from 'lodash';

describe('Filter by course levels', () => {
  describe.each(getClasses())('CourseLevelsFilter.filter(%p, %p)', (allClasses, userSelection, length, order) => {
    it(`should return ${length} classes`, () => {
      const classes = CourseLevelsFilter.filter(allClasses, userSelection);
      expect(classes).toHaveLength(length);

      for (let index = 0; index < order.length; index++) {
        const _class: IClass = classes[index];
        expect(_class.catalogNo).toEqual(order[index]);
      }
    });
  });

  function getClasses() {
    const thousandLevelClass: IClass = TestUtils.copyObject(classJson);
    thousandLevelClass.catalogNo = '1200';
    const twoThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    twoThousandLevelClass.catalogNo = '2100Q2S';
    const threeThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    threeThousandLevelClass.catalogNo = '3200';
    const fourThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    fourThousandLevelClass.catalogNo = '4300';
    const fiveThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    fiveThousandLevelClass.catalogNo = '5400';
    const sixThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    sixThousandLevelClass.catalogNo = '6500L';
    const sevenThousandLevelClass: IClass = TestUtils.copyObject(classJson);
    sevenThousandLevelClass.catalogNo = '7600';
    const oneOption = TestUtils.copyObject(courseLevelsOptions);
    _.set(oneOption, '1000', true);
    const twoOptions = TestUtils.copyObject(courseLevelsOptions);
    _.set(twoOptions, '3000', true);
    _.set(twoOptions, '7000', true);
    const threeOptions = TestUtils.copyObject(courseLevelsOptions);
    _.set(threeOptions, '2000', true);
    _.set(threeOptions, '4000', true);
    _.set(threeOptions, '6000', true);
    const allClasses = [
      thousandLevelClass,
      twoThousandLevelClass,
      threeThousandLevelClass,
      fourThousandLevelClass,
      fiveThousandLevelClass,
      sixThousandLevelClass,
      sevenThousandLevelClass,
    ];

    return [
      [allClasses, courseLevelsOptions, 7, ['1200', '2100Q2S', '3200', '4300', '5400', '6500L', '7600']],
      [allClasses, oneOption, 1, ['1200']],
      [allClasses, twoOptions, 2, ['3200', '7600']],
      [allClasses, threeOptions, 3, ['2100Q2S', '4300', '6500L']],
    ];
  }
});
