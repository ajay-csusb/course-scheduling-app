import { Class, IClass } from './Class';

export class FilterClasses {

  public static filterByActiveClasses(classes: IClass[]): IClass[] {
    const results: IClass[] = [];
    for (let _class of classes) {
      const currClass = new Class(_class);
      if (currClass.isActive()) {
        results.push(_class);
      }
    }
    return results;
  }

}
