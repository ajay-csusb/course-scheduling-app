import * as ClassSearchUtils from './ClassSearchUtils';
import { UserInput } from './UserInput';
import { IClass } from './Class';

export interface ISubject {
  name: string;
  abbr: string;
}
export class Subject {
  static subjectUrl = 'http://webdx.csusb.edu/ClassSchedule/getDropDownList';
  public static getAllSubjects(onSuccess: (response: any) => void,
                               onFailure: (error: string) => void, url: string = this.subjectUrl): void {
    ClassSearchUtils.fetchData(url, onSuccess, onFailure);
  }

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
