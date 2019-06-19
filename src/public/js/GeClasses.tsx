import { UserInput } from './UserInput';
import { IClass } from './Class';

export class GeClasses {
  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    const geClassesInstance = new GeClasses();
    if (!uInput.isGeClassesSet()) {
      return classes;
    }
    return geClassesInstance.isGeClass(classes);
  }

  private isGeClass(classes: IClass[]): IClass[] {
    const geClasses: IClass[] = [];
    classes.forEach((_class: IClass) => {
      if (_class.courseAttr === undefined) {
        return;
      }
      if (_class.courseAttr.length === 0) {
        return;
      }
      const attrs = _class.courseAttr.split(',');
      if (attrs.includes('GE')) {
        geClasses.push(_class);
      }
    });
    return geClasses;
  }

}
