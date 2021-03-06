import { TestUtils } from "./TestUtils";
import { classJson } from "./ClassesJson";
import * as CourseAttributes from '../src/public/js/CourseAttributes';

describe('Filter by course attribute', () => {
  describe('when a user searches for classes related to a course attribute: WI', () => {
    it('should show classes that have the course attribute', () => {
      const classBioFoo = TestUtils.copyObject(classJson);
      classBioFoo.courseAttr = 'Writing Intensive (Non-GE)';
      const classBioBar = TestUtils.copyObject(classJson);
      classBioBar.courseAttr = 'Bar';
      const classesWithCourseAttribute = [classBioBar, classBioFoo];
      const classes = CourseAttributes.filter(classesWithCourseAttribute, 'WI');
      expect(classes).toHaveLength(1);
      expect(classes[0].courseAttr).toEqual('Writing Intensive (Non-GE)');
    });
    
    describe('and a class has multiple course attributes', () => {
      it('should show classes that have the course attributes the user was searching for', () => {
        const classBio1 = TestUtils.copyObject(classJson);
        classBio1.courseAttr = 'Writing Intensive (Non-GE), Buzz, Baz';
        const classBio2 = TestUtils.copyObject(classJson);
        classBio2.courseAttr = 'Bar';
        const classesWithCourseAttribute = [classBio1, classBio2];
        const classes = CourseAttributes.filter(classesWithCourseAttribute, 'WI');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttr).toEqual('Writing Intensive (Non-GE), Buzz, Baz');
      });
    });
  });

  describe('when a class has GE Designation as a course attribute', () => {
    it('should filter classes by GE Designation', () => {
      const classBioGe = TestUtils.copyObject(classJson);
      classBioGe.courseAttr = 'Foo, Bar, Global Perspectives';
      const classBioNoGe = TestUtils.copyObject(classJson);
      classBioNoGe.courseAttr = 'Buzz';
      const classes = CourseAttributes.filter([classBioGe, classBioNoGe], 'DES');
      expect(classes).toHaveLength(1);
      expect(classes[0].courseAttr).toEqual('Foo, Bar, Global Perspectives');
    });

    describe('and a class has multiple GE Designation as a course attributes', () => {
      it('should filter classes by GE Designation the user searched for', () => {
        const classBioGeDes = TestUtils.copyObject(classJson);
        classBioGeDes.courseAttr = 'Foo, Global Perspectives, Writing Intensive';
        const classBioNoGeDes = TestUtils.copyObject(classJson);
        classBioNoGeDes.courseAttr = 'Buzz';
        const classes = CourseAttributes.filter([classBioGeDes, classBioNoGeDes], 'DES');
        expect(classes).toHaveLength(1);
        expect(classes[0].courseAttr).toEqual('Foo, Global Perspectives, Writing Intensive');
      });
    });
  });
});
