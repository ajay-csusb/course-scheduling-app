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

  public static getDropdownOptions(allSubjects: any, term: string): ISubject[] {
    const subjects: ISubject[] = [];
    if (Object.keys(allSubjects).includes(term)) {
      const subjectsFromTerm = allSubjects[term];
      for (const subjectFromTerm of subjectsFromTerm) {
        const subject: ISubject = {
          abbr: subjectFromTerm.subject,
          name: subjectFromTerm.subject_DESC,
        };
        subjects.push(subject);
      }
    }
    subjects.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    const allOption: ISubject = {
      abbr: 'all',
      name: 'All',
    };
    subjects.unshift(allOption);
    return subjects;
  }

}
