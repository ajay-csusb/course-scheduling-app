import { TestUtils } from './TestUtils';
import { classJson } from './ClassesJson';
import { IClass } from '../src/public/js/Class';
import { GeCourseAttribute } from '../src/public/js/GeCourseAttribute';

describe('Filter by GE course attribute', () => {
  const classBioGe = TestUtils.copyObject(classJson);
  const classArtsGe1 = TestUtils.copyObject(classJson);
  const classArtsGe2 = TestUtils.copyObject(classJson);
  let classesGe: IClass[];
  let classes: IClass[];

  beforeEach(() => {
    classBioGe.courseAttr = 'GE-F0 Life Sciences';
    classBioGe.courseAttrDescription = 'Life Science';
    classBioGe.geCourseAttr = 'GE-F0, DES';
    classArtsGe1.courseAttr =
      'Diversity & Inclusiveness Pers, Global Perspectives, Writing Intensive, GE-C4 UD Arts and Humanities';
    classArtsGe1.courseAttrDescription =
      'Diversity & Inclusiveness Pers, Global Perspectives, Student Opinion - Paper, UD Arts and Humanities, Upper Division, Writing Intensive';
    classArtsGe1.geCourseAttr = 'GE-C4, DI, G, Y';
    classArtsGe1.quarter = 2208;
    classArtsGe2.courseAttr = '"Diversity & Inclusiveness Pers, GE-C1 Arts';
    classArtsGe2.courseAttrDescription = 'Arts, Diversity & Inclusiveness Pers, Lower Divison, Student Opinion - Paper';
    classArtsGe2.geCourseAttr = 'GE-C1, DI, 1, Y';
    classArtsGe2.quarter = 2208;
    classesGe = [classBioGe, classArtsGe1, classArtsGe2];
  });

  describe('when a user searches for a GE classes', () => {
    describe('if the term is before Fall 2020', () => {
      it('should return all the classes', () => {
        // Course attribute search term should have a length of 5
        classes = GeCourseAttribute.filter(classesGe, 'GE-F0', '2206');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttr).toEqual('GE-F0 Life Sciences');
      });
    });

    describe('if they filter classes by GE course attribute', () => {
      it('should display classes matching the course attribute', () => {
        classes = GeCourseAttribute.filter(classesGe, 'GE-C1', '2208');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttrDescription).toEqual('GE-C1 Arts');
      });
    });

    describe('if they search for invalid GE course attribute', () => {
      it('should not return any classes', () => {
        classes = GeCourseAttribute.filter(classesGe, 'invalid-option', '2208');
        expect(classes).toHaveLength(0);
      });
    });

    describe('if a user chooses all as an option in the GE course attribte', () => {
      it('should return all the classes', () => {
        classes = GeCourseAttribute.filter(classesGe, 'all', '2208');
        expect(classes).toHaveLength(3);
        expect(classes[0].courseAttr).toEqual('GE-F0 Life Sciences');
      });
    });
  });
});
