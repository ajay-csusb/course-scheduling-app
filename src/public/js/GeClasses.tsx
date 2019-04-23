import { UserInput } from './UserInput';
import { IClass } from './Class';

export class GeClasses {
  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    if (!uInput.isGeClassesSet()) {
      return classes;
    }
    // Filter when GE option is set.
    classes.forEach((_class: IClass) => {
      if (_class.courseAttr === 'GE') {
        result.push(_class);
      }
    });
    return result;
  }
}
