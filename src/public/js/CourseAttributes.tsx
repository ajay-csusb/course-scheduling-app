import { IClass } from './Class';

export function getValidCourseAttributes(): object {
  return {
    ASTD: 'Asian Studies',
    CLST: 'Chicano(a)/Latino(a) Studies',
    CSLI: 'Service Learning',
    DES: 'GE Designation',
    EBK: 'eBook',
    ETHN: 'Ethnic Studies',
    GE: 'General Education',
    GSS: 'Gender and Sexuality Studies',
    HIPS: 'High Impact Practices',
    LCCM: 'Low Cost Course Materials',
    LTAM: 'Latin American Studies',
    SA: 'Study Abroad',
    WI: 'Writing Intensive (non-GE)',
    WSTD: 'Women\'s Studies',
    ZCCM: 'Zero Cost Course Materials',
  };
}

export function filter(classes: IClass[], courseAttrSearchString: string): IClass[] {
  const results: IClass[] = [];
  const courseAttrFull = getFullCourseAttribute(courseAttrSearchString);
  if (courseAttrSearchString.length === 0) {
    return classes;
  }
  if (!isValidCoureAttribute(courseAttrSearchString)) {
    return classes;
  }
  for (const _class of classes) {
    const classCourseAttrs = _class.courseAttr.split(', ');
    const geDesCourseAttrs = courseAttrFull.split(', ');
    if (isGeDesignationAttributeInClass(classCourseAttrs, geDesCourseAttrs)) {
      results.push(_class);
    } else if (classCourseAttrs.includes(courseAttrFull)) {
      results.push(_class);
    }
  }
  return results;
}

function isGeDesignationAttributeInClass(classAttrs: string[], geDesgAttrs: string[]): boolean {
  return classAttrs.some((classAttr) => {
    return geDesgAttrs.includes(classAttr);
  });
}

function isValidCoureAttribute(searchString: string): boolean {
  const courseAttributes = getValidCourseAttributes();
  return (Object.keys(courseAttributes).includes(searchString));
}

function getFullCourseAttribute(courseAttribute: string): string {
  const courseAttributes = getAllCourseAttributes();
  return courseAttributes[courseAttribute];
}

function getAllCourseAttributes(): any {
  const defaultCourseAttributes = getValidCourseAttributes();
  defaultCourseAttributes['DES'] = 'Diversity & Inclusiveness Pers, Global Perspectives, Writing Intensive';
  return defaultCourseAttributes;
}
