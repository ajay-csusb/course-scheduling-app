import { IMeetingDate } from './Class';
import { ISubject } from './Subject';

export class UserInput {
  private campus: string = 'both';
  private day: IMeetingDate = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };
  private subject: string = '';
  private courseNo: string = '';
  private quarter: string = '';
  private startTime: Date = new Date();
  private endTime: Date = new Date();
  private instructionMode: string = 'all';
  private instructor: string = '';
  private courseAttr: string | undefined = '';
  private sessionCode: string | undefined = '';
  private classNo: string | undefined = '';
  private degreeType: string;

  constructor(campus: string, day: IMeetingDate, subject: ISubject, courseNo: string, quarter: string,
              startTime: Date, endTime: Date, instructionMode: string, instructor: string,
              courseAttr?: string, classNo?: string, sessionCode?: string) {
    this.campus = campus;
    this.day = day;
    this.subject = subject.abbr;
    this.courseNo = courseNo;
    this.quarter = quarter;
    this.startTime = startTime;
    this.endTime = endTime;
    this.instructionMode = instructionMode;
    this.instructor = instructor;
    this.courseAttr = courseAttr;
    this.sessionCode = sessionCode;
    this.classNo = classNo;
    this.degreeType = '';
  }

  public getCampus(): string {
    if (this.campus === 'san-bernardino') {
      return 'MAIN';
    }
    if (this.campus === 'palm-desert') {
      return 'PALM';
    }
    return '';
  }

  public isMondayChecked(): boolean  {
    return (this.day.mon);
  }

  public isTuesdayChecked(): boolean  {
    return (this.day.tue);
  }

  public isWednesdayChecked(): boolean  {
    return (this.day.wed);
  }

  public isThursdayChecked(): boolean  {
    return (this.day.thu);
  }

  public isFridayChecked(): boolean  {
    return (this.day.fri);
  }

  public isSaturdayChecked(): boolean  {
    return (this.day.sat);
  }

  public isSundayChecked(): boolean  {
    return (this.day.sun);
  }

  public getSubject(): string {
    if (this.subject === 'all') {
      return '';
    }
    return this.subject;
  }

  public getInstructor(): string {
    if (this.instructor === 'All') {
      return '';
    }
    return this.instructor;
  }

  public getInstructionMode(): string {
    return (this.instructionMode === 'all') ? '' : this.instructionMode;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public getEndTime(): Date {
    return this.endTime;
  }

  public getCourseNo(): string {
    return this.courseNo;
  }

  public getCourseAttr(): string | undefined {
    return (this.courseAttr === 'all' || this.courseAttr === undefined) ? '' : this.courseAttr.toLowerCase();
  }

  public getSessionCode(): string | undefined {
    return (this.sessionCode === 'all' || this.sessionCode === undefined) ? '' : this.sessionCode;
  }

  public getClassNo(): string | undefined {
    return this.classNo;
  }

  public getTerm(): string | undefined {
    return this.quarter;
  }

  public getDegreeType(): string {
    return (this.degreeType === 'all') ? '' : this.degreeType;
  }

  public setDegreeType(degreeType: string): void {
    if (degreeType === 'UGRD' || degreeType === 'PBAC' || degreeType === 'EXED') {
      this.degreeType = degreeType;
    }
  }
}
