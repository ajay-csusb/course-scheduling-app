import { IClass } from './Class';
import * as ClassSearchUtils from './ClassSearchUtils';
import { app } from './ClassSearch.d';

export class OpenClassesFilter {
  public static filter(classes: IClass[], openClasses: boolean = false) {
    const result: IClass[] = [];

    if (!openClasses) {
      return classes;
    }

    classes.forEach((_class: IClass) => {
      if (
        _class.enrollmentStatus === 'Open' &&
        _class.classStatus === 'Active' &&
        ClassSearchUtils.isValidTermRange(app.state.currentTerm.toString(), _class.quarter, new Date().getMonth() + 1)
      ) {
        result.push(_class);
      }
    });

    return result;
  }
}
