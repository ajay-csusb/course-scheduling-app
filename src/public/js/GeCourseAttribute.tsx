import { IOptionProps } from '@blueprintjs/core';
import { IClass } from './Class';

export class GeCourseAttribute {

  private static courseAttrArr: string[] = [];

  public static addGeAttrs(_class: IClass, geAttrs: IOptionProps[]): string {
    GeCourseAttribute.courseAttrArr = _class.courseAttr.split(', ');
    const geCourseAttrArr = _class.geCourseAttr.split(', ');
    if (!GeCourseAttribute.courseAttrArr.includes('General Education')) {
      return _class.courseAttr;
    }
    const fullGeCourseAttr = GeCourseAttribute.addFullGeCourseAttribute(geCourseAttrArr , geAttrs);
    return fullGeCourseAttr.join(', ');
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

}
