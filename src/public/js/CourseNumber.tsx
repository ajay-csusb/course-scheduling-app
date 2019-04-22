import { UserInput } from './UserInput';
import { IClass } from './Class';
export class CourseNumber {

  public static filter(classes: IClass[] , uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    const courseNoInstance = new CourseNumber();
    classes.forEach((_class: IClass) => {
      if (courseNoInstance.doesCourseIdMatchUserInput(_class, uInput)) {
        result.push(_class);
      }
    });
    return result;
  }

  private doesCourseIdMatchUserInput(classes: IClass, uInput: UserInput): boolean {
    const courseId = classes.catalogNo.trim();
    const userChoice = uInput.getCourseNo().trim();
    return (courseId.indexOf(userChoice) >= 0);
  }

}
