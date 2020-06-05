export interface ISubject {
  name: string;
  abbr: string;
}
export class Subject {

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
