import { TestUtils } from './TestUtils';
import { classJson } from './ClassesJson';
import { IClass } from '../src/public/js/Class';
import { GeCourseAttribute } from '../src/public/js/GeCourseAttribute';

describe('Filter by GE course attribute', () => {
  const classBioGe = TestUtils.copyObject(classJson);
  const classBioGe1 = TestUtils.copyObject(classJson);
  let classesBio: IClass[];
  let classes: IClass[];

  beforeEach(() => {
    classBioGe.courseAttr = 'GE-F0 Life Sciences';
    classBioGe.courseAttrDescription = 'Life Science';
    classBioGe.geCourseAttr = 'GE-F0, DES';
    classBioGe1.courseAttr = 'General Education';
    classBioGe1.courseAttrDescription = 'UD Scientific Inquiry & Quant.';
    classBioGe1.geCourseAttr = 'GE-B5, DES';
    classesBio = [classBioGe, classBioGe1];
  });

  describe('when a user searches for a GE classes', () => {
    describe('if the term is before Fall 2020', () => {
      it('should return all the classes', () => {
        // Course attribute search term should have a length of 5
        classes = GeCourseAttribute.filter(classesBio, 'GE-F0', '2206');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttr).toEqual('GE-F0 Life Sciences');
      });
    });

    describe('and they filter by GE course attribute', () => {
      it('should display classes matching the course attribute', () => {
        classes = GeCourseAttribute.filter(classesBio, 'GE-B5', '2208');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttrDescription).toEqual('GE-B5 UD Scientific Inquiry & Quant.');
      });
    });
    describe('if they search for invalid GE course attribute', () => {
      it('should not return any classes', () => {
        classes = GeCourseAttribute.filter(classesBio, 'invalid-option', '2208');
        expect(classes).toHaveLength(0);
      });
    });
  });
});
