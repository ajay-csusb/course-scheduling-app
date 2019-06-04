import { UserInput } from './UserInput';
import { IClass } from './Class';
export class Instructor {

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
