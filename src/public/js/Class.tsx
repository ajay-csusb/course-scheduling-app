import * as ClassSearchUtils from './ClassSearchUtils';
import { UserInput } from './UserInput';
import { Watchdog } from './Watchdog';
export interface IClass {
  quarter: string;
  subject: string;
  catalogNo: string;
  classSection: string;
  textbook: string;
  employeeId: string;
  profile?: string;
  classStartTime: string;
  classEndTime: string;
  courseOfferNo?: number;
  classNumber?: number;
  enrolledCapacity: number;
  enrolledTotal: number;
  waitlistCapacity: number;
  waitlistTotal: number;
  classMeetingNo: number;
  csuUnits: number;
  amount: number;
  courseId: string;
  sessionCode: string;
  description: string;
  ssrComponent: string;
  classType?: string;
  classStat?: string;
  campus: string;
  longDescription?: string;
  schedulePrint?: string;
  academicGroup?: string;
  academicOrg?: string;
  instructionMode: string;
  sbCourseZccm?: string;
  consent?: string;
  facilityId: string;
  buildingCode: string;
  room: string;
  mon: string;
  tues: string;
  wed: string;
  thurs: string;
  fri: string;
  sat: string;
  sun: string;
  instructorName: string;
  instructorEmployeeId?: string;
  instructorAltName?: string;
  courseAttr: string;
  degreeType: string;
}

export interface IMeetingDate {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

export class Class {
  static classesUrl = 'https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS';

  private classInfo: IClass;

  constructor(classData: IClass) {
    this.classInfo = classData;
  }

  static transformToClass(object: any): IClass {
    const result: IClass = {
      quarter : object.strm,
      subject : object.subject,
      catalogNo : object.catalog_NBR,
      classSection : object.class_SECTION,
      textbook : object.book,
      employeeId : object.emplid,
      profile : object.profile_PATH,
      classStartTime : object.class_START_TIME,
      classEndTime : object.class_END_TIME,
      courseOfferNo : object.crse_OFFER_NBR,
      classNumber : object.class_NBR,
      enrolledCapacity : object.enrl_CAP,
      enrolledTotal : object.enrl_TOT,
      waitlistCapacity : object.wait_CAP,
      waitlistTotal : object.wait_TOT,
      classMeetingNo : object.class_MTG_NBR,
      csuUnits : object.csu_APDB_CMP_UNITS,
      amount : object.flat_AMT,
      courseId : object.crse_ID,
      sessionCode : object.session_CODE,
      description : object.descr,
      ssrComponent : object.ssr_COMPONENT,
      classType : object.class_TYPE,
      classStat : object.class_STAT,
      campus : object.campus,
      longDescription : object.descrlong_VC,
      schedulePrint : object.schedule_PRINT,
      academicGroup : object.acad_GROUP,
      academicOrg : object.acad_ORG,
      instructionMode : object.instruction_MODE,
      sbCourseZccm : object.sb_CRSE_ZCCM,
      consent : object.consent,
      facilityId : object.facility_ID,
      buildingCode : object.bldg_CD,
      room : object.room,
      mon : object.mon,
      tues : object.tues,
      wed : object.wed,
      thurs : object.thurs,
      fri : object.fri,
      sat : object.sat,
      sun : object.sun,
      instructorName : object.name,
      instructorEmployeeId : object.emplid2,
      instructorAltName : object.name2,
      courseAttr: object.crse_ATTR,
      degreeType: object.acad_CAREER,
    };
    return result;
  }

  static getAllClasses(onSuccess: (response: any) => void, onFailure: (error: string) => void, userInput: UserInput): void {
    const params = {
      strm: userInput.getTerm(),
      class_nbr: userInput.getClassNo(),
      section_code: userInput.getSessionCode(),
      subject: userInput.getSubject().toUpperCase(),
      name: userInput.getInstructor(),
      catalog_nbr: userInput.getCourseNo(),
      campus: userInput.getCampus(),
      crse_attr: userInput.getCourseAttr(),
      crse_attr_value: userInput.getGeClassesAttr(),
      meeting_time_start: '',
      ssr_component: '',
      mon: userInput.isMondayChecked() ? 'Y' : '',
      tues: userInput.isTuesdayChecked() ? 'Y' : '',
      wed: userInput.isWednesdayChecked() ? 'Y' : '',
      thurs: userInput.isThursdayChecked() ? 'Y' : '',
      fri: userInput.isFridayChecked() ? 'Y' : '',
      sat: userInput.isSaturdayChecked() ? 'Y' : '',
      sun: userInput.isSundayChecked() ? 'Y' : '',
      instruction_mode: '',
      acad_career: userInput.getDegreeType(),
    };
    ClassSearchUtils.fetchWithArg(this.classesUrl, params, onSuccess, onFailure);
    Watchdog.log(params);
  }

  public getClassMeetingDates(): string {
    let days = '';
    let day = '';
    if (this.classInfo.mon === 'Y') {
      day += ' M';
    }
    if (this.classInfo.tues === 'Y') {
      day += ' Tu';
    }
    if (this.classInfo.wed === 'Y') {
      day += ' W';
    }
    if (this.classInfo.thurs === 'Y') {
      day += ' Th';
    }
    if (this.classInfo.fri === 'Y') {
      day += ' F';
    }
    if (this.classInfo.sat === 'Y') {
      day += ' Sa';
    }
    if (this.classInfo.sun === 'Y') {
      day += ' Su';
    }
    // Strip leading and trailing spaces, and replace spaces in between with -
    days = day.replace(/(^\s+)/g, '').replace(/(\s+)/g, '-');
    if (day === '') {
      days = 'N/A';
    }
    return days;
  }
  public getClassMeetingTimes(): string {
    let meetingTimes = 'N/A';
    if (!this.areStartTimeEndTimeEmpty()) {
      meetingTimes = `${this.classInfo.classStartTime} - ${this.classInfo.classEndTime}`.toLowerCase();
    }
    return meetingTimes;
  }

  private areStartTimeEndTimeEmpty(): boolean {
    return (this.classInfo.classStartTime.length === 0 && this.classInfo.classEndTime.length === 0);
  }
}
