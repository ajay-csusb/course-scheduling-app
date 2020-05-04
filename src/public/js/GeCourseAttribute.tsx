import { IOptionProps } from '@blueprintjs/core';
import { IClass } from './Class';
import * as ClassSearch from './ClassSearch.d';
import * as CourseAttributes from './CourseAttributes';

export class GeCourseAttribute {

  private static courseAttrArr: string[] = [];

  public static addGeAttrs(_class: IClass, geAttrs: IOptionProps[]): string {
    // To expand GE attributes use the values from Course Attribute field whereas
    // to expand GE Designation attributes use the values from the Couse Description field.
    GeCourseAttribute.courseAttrArr = _class.courseAttr.split(', ');
    let fullGeCourseAttr: any = [];
    if (!GeCourseAttribute.courseAttrArr.includes('General Education')) {
      return _class.courseAttr;
    }
    const geCourseAttrArr = _class.geCourseAttr.split(', ');
    if (GeCourseAttribute.isSemesterTerm(_class)) {
      fullGeCourseAttr = GeCourseAttribute.addSemesterGeAttrs(_class, fullGeCourseAttr, geCourseAttrArr);
    } else {
      fullGeCourseAttr = GeCourseAttribute.addFullGeCourseAttribute(geCourseAttrArr, geAttrs);
    }
    return fullGeCourseAttr.join(', ');
  }

  public static filter(classes: IClass[], courseAttr: string, term: string): IClass[] {
    if (courseAttr.length === 0) {
      return classes;
    }
    if (parseInt(term, 10) < ClassSearch.app.settings.firstSemester) {
      return GeCourseAttribute.filterClassesByGeAttributesQuarter(classes, courseAttr);
    }
    const results: IClass[] = [];
    const semGeCourseAttr = GeCourseAttribute.getFullDescriptionSemesterGeCourseAttribute(courseAttr);
    if (semGeCourseAttr.length === 0) {
      return results;
    }
    const geCourseAttributeParsed = GeCourseAttribute.normalizeGeCourseAttributesLabel(semGeCourseAttr);
    for (const _class of classes) {
      if (_class.courseAttrDescription.toLowerCase().includes(geCourseAttributeParsed)) {
        _class.courseAttrDescription = semGeCourseAttr;
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

  public static getCourseAttributesSemester(): IOptionProps[] {
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

  public static getCourseAttributesQuarter(): IOptionProps[] {
    return (
      [
        { label: 'GE-A1 Written Communication', value: 'GE-A1' },
        { label: 'GE-A2 Oral Communication', value: 'GE-A2' },
        { label: 'GE-A4 Critical Thinking', value: 'GE-A4' },
        { label: 'GE-B1 Mathematics', value: 'GE-B1' },
        { label: 'GE-B2 Life Sciences', value: 'GE-B2' },
        { label: 'GE-B3 Physical Sciences', value: 'GE-B3' },
        { label: 'GE-B4 Special Topics Science a', value: 'GE-B4' },
        { label: 'GE-B5 Capstone Natural Science', value: 'GE-B5' },
        { label: 'GE-C1 Arts', value: 'GE-C1' },
        { label: 'GE-C2 Literature', value: 'GE-C2' },
        { label: 'GE-C3 Foreign Language', value: 'GE-C3' },
        { label: 'GE-C4 Philosophy', value: 'GE-C4' },
        { label: 'GE-C5 Capstone Humanities', value: 'GE-C5' },
        { label: 'GE-D1 Am. History and Civ.', value: 'GE-D1' },
        { label: 'GE-D2 American Institutions', value: 'GE-D2' },
        { label: 'GE-D3 World Cultures', value: 'GE-D3' },
        { label: 'GE-D4 Discipline Perspectives', value: 'GE-D4' },
        { label: 'GE-D5 Capstone SBS', value: 'GE-D5' },
        { label: 'GE-E1 Whole Person - Physical', value: 'GE-E1' },
        { label: 'GE-E2 Whole Person - Social an', value: 'GE-E2' },
        { label: 'GE-E3 Physical Education', value: 'GE-E3' },
        { label: 'GE-G1 Multicultural/Gender Cap', value: 'GE-G1' },
        { label: 'GE-G2 Multicultural/Gender Ele', value: 'GE-G2' },
      ]
    );
  }

  private static getValidGeCourseAttributes(courseDescription: string): string {
    const validGeDesignationAttributes = [
      'Diversity & Inclusiveness Pers',
      'Global Perspectives',
      'Writing Intensive',
    ];
    const result: string[] = [];
    // To expand GE attributes use the values from Course Attribute field whereas
    // to expand GE Designation attributes use the values from the Couse Description field.
    const courseDescArr = courseDescription.split(', ');
    for (const courseDesc of courseDescArr) {
      if (validGeDesignationAttributes.includes(courseDesc)) {
        result.push(courseDesc);
      }
    }
    return result.join(', ');
  }

  private static normalizeGeCourseAttributesLabel(label: string): string {
    return label.trim().toLowerCase().slice(6);
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

  private static getFullDescriptionSemesterGeCourseAttribute(courseAttr: string): string {
    const semCourseAttributes = GeCourseAttribute.getCourseAttributesSemester();
    for (const semCourseAttribute of semCourseAttributes) {
      if (courseAttr === semCourseAttribute.value) {
        return semCourseAttribute.label!;
      }
    }
    return '';
  }

  private static addFullGeCourseAttribute(geCourseAttrArr: string[], geAttrs: IOptionProps[]): string[] {
    const courseAttrIndex = GeCourseAttribute.courseAttrArr.indexOf('General Education');
    // Delete the element that has the value General Education
    if (courseAttrIndex !== -1) {
      GeCourseAttribute.courseAttrArr.splice(courseAttrIndex, 1);
    }
    // loop through all the GE course attributes
    // tslint:disable-next-line:forin
    for (const index in geCourseAttrArr) {
      const val = geCourseAttrArr[index];
      // If any GE course attribute starts with GE
      if (val.startsWith('GE')) {
        // loop through the list of available GE course attributes
        for (const geIndex in geAttrs) {
          // if the value in the list matches the GE course attribute
          // of the class
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

  private static isSemesterTerm(_class: IClass): boolean {
    return (parseInt(_class.quarter, 10) >= ClassSearch.app.settings.firstSemester);
  }

  private static addSemesterGeAttrs(_class: IClass, fullGeCourseAttr: string[], geCourseAttrArr: string[]) {
    let containsGeDesignation = false;
    let geAttribute = fullGeCourseAttr;
    // Semester classes do not have a course attribute as GE designation
    if (geAttribute.includes('GE Designation')) {
      containsGeDesignation = true;
    }
    const semGeAttr = GeCourseAttribute.getCourseAttributesSemester();
    // The method below strips out GE designation
    geAttribute = GeCourseAttribute.addFullGeCourseAttribute(geCourseAttrArr, semGeAttr);
    // Add GE designation back
    if (containsGeDesignation && !geAttribute.includes('GE Designation')) {
      geAttribute.unshift('GE Designation');
    }
    return geAttribute;
  }

  private static filterClassesByGeAttributesQuarter(classes: IClass[], courseAttr: string): IClass[] {
    const results: IClass[] = [];
    for (const _class of classes) {
      const allCourseAttributes = _class.courseAttr.split(', ');
      for (const courseAttribute of allCourseAttributes) {
        // slice(0, 5) extracts GE-FOO from GE-FOO Full Description
        if (courseAttribute.slice(0, 5).toLowerCase() === courseAttr.toLowerCase()) {
          results.push(_class);
        }
      }
    }
    return results;
  }

}
