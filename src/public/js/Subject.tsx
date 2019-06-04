import { UserInput } from './UserInput';
import { IClass } from './Class';

export interface ISubject {
  name: string;
  abbr: string;
}
export class Subject {

  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    classes.forEach((_class: IClass) => {
      if (uInput.getSubject() === '') {
        result.push(_class);
      }
      if (_class.subject.toLowerCase() === uInput.getSubject().toLowerCase()) {
        result.push(_class);
      }
    });
    return result;
  }

}
