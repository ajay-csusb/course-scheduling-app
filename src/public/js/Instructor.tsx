import * as ClassSearchUtils from './ClassSearchUtils';
import { UserInput } from './UserInput';
import { IClass } from './Class';
export class Instructor {

  static instructorUrl = 'https://webdx.csusb.edu/ClassSchedule/getDropDownList ';
  public static getAllInstructors(onSuccess: (response: any) => void,
                                  onFailure: (error: string) => void, url: string = this.instructorUrl): void {
    ClassSearchUtils.fetchData(url, onSuccess, onFailure);
  }

  public static filter(classes: IClass[] , uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    const instructorInstance = new Instructor();
    if (instructorInstance.isInstructorEmpty(uInput)) {
      return classes;
    }
    classes.forEach((_class: IClass) => {
      if (_class.instructorName.toLowerCase() === uInput.getInstructor().toLowerCase()) {
        result.push(_class);
      }
    });
    return result;
  }

  private isInstructorEmpty(uInput: UserInput): boolean {
    return (uInput.getInstructor() === '');
  }

}
