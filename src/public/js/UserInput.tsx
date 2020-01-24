import { IMeetingDate } from './Class';

export class UserInput {
  private campus: string;
  private day: IMeetingDate;
  private subject: string;
  private courseNo: string;
  private term: string;
  private startTime: Date;
  private endTime: Date;
  private instructionMode: string;
  private instructor: string;
  private courseAttr: string;
  private sessionCode: string;
  private classNo: string;
  private degreeType: string;
  private geClassesAttr: string;

  constructor() {
    this.campus = '';
    this.day = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
    this.subject = '';
    this.courseNo = '';
    this.term = '';
    this.startTime = new Date();
    this.endTime = new Date();
    this.instructionMode = '';
    this.instructor = '';
    this.courseAttr = '';
    this.sessionCode = '';
    this.classNo = '';
    this.degreeType = '';
    this.geClassesAttr = '';
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

  public getCourseAttr(): string {

    if (this.courseAttr === 'UGRD'
      || this.courseAttr === 'PBAC'
      || this.courseAttr === 'EXED'
      || this.courseAttr === 'all'
      || this.courseAttr === undefined
    ) {
      return '';
    }
    return this.courseAttr.toLowerCase();
  }

  public getSessionCode(): string | undefined {
    return (this.sessionCode === 'all' || this.sessionCode === undefined) ? '' : this.sessionCode;
  }

  public getClassNo(): string | undefined {
    return this.classNo;
  }

  public getTerm(): string | undefined {
    return this.term;
  }

  public getDegreeType(): string {
    return (this.degreeType === 'all') ? '' : this.degreeType;
  }

  public getGeClassesAttr(): string {
    return this.geClassesAttr;
  }

  public setDegreeType(degreeType: string): void {
    this.degreeType = degreeType;
  }

  public setCampus(campus: string): void {
    this.campus = campus;
  }

  public getMeetingDay(): IMeetingDate {
    return this.day;
  }

  public setMeetingDay(meetingDay: IMeetingDate): void {
    this.day = meetingDay;
  }

  public setSubject(subject: string): void {
    this.subject = subject;
  }

  public setCourseNo(courseNumber: string): void {
    this.courseNo = courseNumber;
  }

  public setTerm(term: string): void {
    this.term = term;
  }

  public setStartTime(startTime: Date): void {
    this.startTime = startTime;
  }

  public setEndTime(endTime: Date): void {
    this.endTime = endTime;
  }

  public setInstructionMode(instructionMode: string): void {
    this.instructionMode = instructionMode;
  }

  public setInstructor(instructor: string): void {
    this.instructor = instructor;
  }

  public setCourseAttr(courseAttr: string): void {
    this.courseAttr = courseAttr;
  }

  public setClassNo(classNo: string): void {
    this.classNo = classNo;
  }

  public setSessionCode(sessionCode: string): void {
    this.sessionCode = sessionCode;
  }

  public setGeClassesAttr(geClassesAttr: string): void {
    this.geClassesAttr = geClassesAttr;
  }

}
