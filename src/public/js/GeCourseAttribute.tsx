import { IOptionProps } from '@blueprintjs/core';
import { IClass } from './Class';
import * as ClassSearch from './ClassSearch.d';
import * as CourseAttributes from './CourseAttributes';

export class GeCourseAttribute {

  private static courseAttrArr: string[] = [];

  public static addGeAttrs(_class: IClass, geAttrs: IOptionProps[]): string {
    GeCourseAttribute.courseAttrArr = _class.courseAttr.split(', ');
    let fullGeCourseAttr: any = [];
    if (!GeCourseAttribute.courseAttrArr.includes('General Education')) {
      return _class.courseAttr;
    }
    const geCourseAttrArr = _class.geCourseAttr.split(', ');
    fullGeCourseAttr = GeCourseAttribute.addFullGeCourseAttribute(geCourseAttrArr , geAttrs);
    if (parseInt(_class.quarter, 10) >= ClassSearch.app.settings.firstSemester) {
      const semGeAttr = GeCourseAttribute.getCourseAttributesSemester();
      fullGeCourseAttr = GeCourseAttribute.addFullGeCourseAttribute(geCourseAttrArr , semGeAttr);
    }
    return fullGeCourseAttr.join(', ');
  }

  public static filter(classes: IClass[], courseAttr: string, term: string): IClass[] {
    if (parseInt(term, 10) < ClassSearch.app.settings.firstSemester) {
      return classes;
    }
    if (courseAttr.length === 0) {
      return classes;
    }
    const results: IClass[] = [];
    const fullCourseAttribute = GeCourseAttribute.getSemesterGeCourseAttribute(courseAttr);
    for (const _class of classes) {
      const classCourseAttributeNormalized = GeCourseAttribute.normalizeCourseDescription(_class.courseAttrDescription);
      if (classCourseAttributeNormalized.startsWith(courseAttr)) {
        _class.courseAttrDescription = fullCourseAttribute;
        results.push(_class);
      }
    }
    return results;
  }

  public static normalizeCourseDescription(courseDescription: string): string {
    return courseDescription.trim().toLowerCase().split(' ').join('-');
  }
  public static addGeDesignationAttrs(_class: IClass): string {
    if (parseInt(_class.quarter, 10) < ClassSearch.app.settings.firstSemester) {
      return _class.courseAttr;
    }
    const geDesignationAttrs = _class.courseAttr.split(', ');
    const validCourseAttributes = GeCourseAttribute.removeInvalidCourseAttributes(geDesignationAttrs);
    if (validCourseAttributes.includes('GE Designation')) {
      const index = validCourseAttributes.indexOf('GE Designation');
      validCourseAttributes[index] = GeCourseAttribute.getValidGeCourseAttributes(_class.courseAttrDescription);
    }
    return validCourseAttributes.join(', ');
  }

  private static getValidGeCourseAttributes(courseDescription: string): string {
    const validGeDesignationAttributes = [
      'Diversity & Inclusiveness Pers',
      'Global Perspective',
      'Writing Intensive',
    ];
    const result: string[] = [];
    const courseDescArr = courseDescription.split(', ');
    for (const courseDesc of courseDescArr) {
      if (validGeDesignationAttributes.includes(courseDesc)) {
        result.push(courseDesc);
      }
    }
    return result.join(', ');
  }
  private static removeInvalidCourseAttributes(courseAttrs: string[]): string[] {
    const validGeCourseAttrs: string[] = [];
    const validCourseAttrs = CourseAttributes.getValidCourseAttributes();
    const validCourseAttrsArr = Object.values(validCourseAttrs);
    for (const courseAttr of courseAttrs) {
      if (validCourseAttrsArr.includes(courseAttr)) {
        validGeCourseAttrs.push(courseAttr);
      }
    }
    const validSemGeCourseAttrs = GeCourseAttribute.getCourseAttributesSemester();
    for (const geCourseAttr of validSemGeCourseAttrs) {
      if (courseAttrs.includes(geCourseAttr.label!)) {
        validGeCourseAttrs.push(geCourseAttr.label!);
      }
    }
    return validGeCourseAttrs;
  }

  private static getSemesterGeCourseAttribute(courseAttr: string): string {
    const semCourseAttributes = GeCourseAttribute.getCourseAttributesSemester();
    for (const semCourseAttribute of semCourseAttributes) {
      const semCourseAttributeNormalized = GeCourseAttribute.normalizeGeCourseAttributesLabel(semCourseAttribute.label!);
      if (courseAttr === semCourseAttributeNormalized) {
        return semCourseAttribute.label!;
      }
    }
    return '';
  }

  private static normalizeGeCourseAttributesLabel(label: string): string {
    return label.trim().toLowerCase().slice(6).split(' ').join('-');
  }

  private static addFullGeCourseAttribute(geCourseAttrArr: string[], geAttrs: IOptionProps[]): string[] {
    const courseAttrIndex = GeCourseAttribute.courseAttrArr.indexOf('General Education');
    GeCourseAttribute.courseAttrArr.splice(courseAttrIndex, 1);
    // tslint:disable-next-line:forin
    for (const index in geCourseAttrArr) {
      const val = geCourseAttrArr[index];
      if (val.startsWith('GE')) {
        for (const geIndex in geAttrs) {
          if (geAttrs[geIndex].value === val) {
            const geAttribute = geAttrs[geIndex].label!;
            if (!GeCourseAttribute.courseAttrArr.includes(geAttribute)) {
              GeCourseAttribute.courseAttrArr.push(geAttribute);
            }
          }
        }
      }
    }
    return GeCourseAttribute.courseAttrArr;
  }

  private static getCourseAttributesSemester(): IOptionProps[] {
    return (
      [
      { label: 'GE-A1 Oral Communication', value: 'GE-A1' },
      { label: 'GE-A2 Written Communication', value: 'GE-A2' },
      { label: 'GE-A3 Critical Thinking', value: 'GE-A3' },
      { label: 'GE-B1 Physical Science', value: 'GE-B1' },
      { label: 'GE-B2 Life Science', value: 'GE-B2' },
      { label: 'GE-B3 Laboratory Activity', value: 'GE-B3' },
      { label: 'GE-B4 Mathematics/Quant. Reasoning', value: 'GE-B4' },
      { label: 'GE-B5 UD Scientific Inquiry & Quant.', value: 'GE-B5' },
      { label: 'GE-C1 Arts', value: 'GE-C1' },
      { label: 'GE-C2 Humanities', value: 'GE-C2' },
      { label: 'GE-C3 Additional C1 or C2 Course', value: 'GE-C3' },
      { label: 'GE-C4 UD Arts and Humanities', value: 'GE-C4' },
      { label: 'GE-D1 United States Government', value: 'GE-D1' },
      { label: 'GE-D2 United States History', value: 'GE-D2' },
      { label: 'GE-D3 Social Sciences Discipline', value: 'GE-D3' },
      { label: 'GE-D4 UD Social Sciences', value: 'GE-D4' },
      { label: 'GE-E  First-Year Seminar', value: 'GE-E' },
      ]
    );
  }
}
