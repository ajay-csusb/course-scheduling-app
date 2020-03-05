import { IOptionProps } from '@blueprintjs/core';
import { IClass } from './Class';

export class GeCourseAttribute {
  public static addGeAttrs(_class: IClass, geAttrs: IOptionProps[]): string {
    const courseAttArr = _class.courseAttr.split(', ');
    const geCourseAttrArr = _class.geCourseAttr.split(', ');
    if (!courseAttArr.includes('General Education')) {
      return _class.courseAttr;
    }
    const courseAttrIndex = courseAttArr.indexOf('General Education');
    // tslint:disable-next-line:forin
    for (const index in geCourseAttrArr) {
      const val = geCourseAttrArr[index];
      if (val.startsWith('GE')) {
        for (const geIndex in geAttrs) {
          if (geAttrs[geIndex].value === val) {
            courseAttArr[courseAttrIndex] = geAttrs[geIndex].label!;
          }
        }
      }
    }
    return courseAttArr.join(', ');
  }

}
