import { IMeetingDate, IMeetingTime } from './Class';
import { ISubject } from './Subject';

export class UserInput {
  private campus: string = 'both';
  private day: IMeetingDate = {
    all: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };
  private subject: string = '';
  private quarter: string = 'current';
  private time: IMeetingTime = {
    all: false,
    beforeNoon: false,
    afterNoon: false,
    evening: false,
  };
  private instructionMode: string = 'all';
  private instructor: string = '';

  constructor(campus: string, day: IMeetingDate, subject: ISubject, quarter: string,
              time: IMeetingTime, instructionMode: string, instructor: string) {
    this.campus = campus;
    this.day = day;
    this.subject = subject.abbr;
    this.quarter = quarter;
    this.time = time;
    this.instructionMode = instructionMode;
    this.instructor = instructor;
  }

  public isBothCampusChecked(): boolean {
    return (this.campus === 'both');
  }

  public isSanBernardinoChecked(): boolean {
    return (this.campus === 'san-bernardino');
  }

  public isPalmDesertChecked(): boolean {
    return (this.campus === 'palm-desert');
  }

  public isAllDaysChecked(): boolean {
    return (this.day.all);
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

  public isCurrentQuarterChecked(): boolean  {
    return (this.quarter === 'current');
  }

  public isPreviousQuarterChecked(): boolean  {
    return (this.quarter === 'prev');
  }

  public isBothQuartersChecked(): boolean {
    return (this.quarter === 'both');
  }

  public isAllTimesChecked(): boolean  {
    return (this.time.all);
  }

  public isBeforeNoonChecked(): boolean  {
    return (this.time.beforeNoon);
  }

  public isAfterNoonChecked(): boolean  {
    return (this.time.afterNoon);
  }

  public isEveningChecked(): boolean  {
    return (this.time.evening);
  }

  public isBothInstructionModeChecked(): boolean  {
    return (this.instructionMode === 'both');
  }

  public isInPersonChecked(): boolean  {
    return (this.instructionMode === 'classroom');
  }

  public isOnlineChecked(): boolean  {
    return (this.instructionMode === 'online');
  }
  public getSubject(): string {
    return this.subject;
  }

  public getInstructor(): string {
    return this.instructor;
  }

  public getInstructionMode(): string {
    return this.instructionMode;
  }

}
