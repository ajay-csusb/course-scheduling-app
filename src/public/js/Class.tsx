import * as ClassSearchUtils from './ClassSearchUtils';
import { UserInput } from './UserInput';
import { app } from './ClassSearch.d';
import * as _ from 'lodash';

export interface IClass {
  amount: number;
  academicGroup?: string;
  academicOrg?: string;
  buildingCode: string;
  campus: string;
  catalogNo: string;
  classEndTime: string;
  classSection: string;
  classStartTime: string;
  classMeetingNo: number;
  classNumber: number;
  classStatus: string;
  classType?: string;
  courseAttr: string;
  courseAttrDescription: string;
  courseId: string;
  courseOfferNo?: number;
  csuUnits: number;
  degreeType: string;
  description: string;
  employeeId: string;
  enrolledCapacity: number;
  enrollmentStatus: string;
  enrolledTotal: number;
  facilityId: string;
  fee: string;
  fri: string;
  fullSsrComponent: string;
  geCourseAttr: string;
  instructorAltName?: string;
  instructorEmployeeId?: string;
  instructionMode: string;
  instructorName: string;
  longDescription?: string;
  mon: string;
  profile?: string;
  quarter: string;
  room: string;
  sat: string;
  sbCourseZccm?: string;
  schedulePrint?: string;
  sessionCode: string;
  ssrComponent: string;
  subject: string;
  sun: string;
  textbook: string;
  thurs: string;
  title: string;
  topic: string;
  tues: string;
  waitlistCapacity: number;
  waitlistTotal: number;
  wed: string;
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
export interface ICareerLevels {
  ugrd: boolean;
  pbac: boolean;
  exed: boolean;
}

export class Class {
  private classInfo: IClass;

  constructor(classData: IClass) {
    this.classInfo = classData;
  }

  static transformToClass(object: any): IClass {
    const result: IClass = {
      amount: object.flat_AMT,
      academicGroup: object.acad_GROUP,
      academicOrg: object.acad_ORG,
      buildingCode: object.meeting_TIME[0].bldg_CD,
      campus: object.campus,
      catalogNo: object.catalog_NBR,
      classEndTime: object.meeting_TIME[0].class_END_TIME,
      classSection: object.class_SECTION,
      classStartTime: object.meeting_TIME[0].class_START_TIME,
      classMeetingNo: object.class_MTG_NBR,
      classNumber: object.class_NBR,
      classStatus: object.class_STAT,
      classType: object.class_TYPE,
      courseAttr: object.crse_ATTR,
      courseAttrDescription: object.crse_ATTR_VALUE_DESCR,
      courseId: object.crse_ID,
      courseOfferNo: object.crse_OFFER_NBR,
      csuUnits: object.csu_APDB_CMP_UNITS,
      degreeType: object.acad_CAREER,
      description: object.descr,
      employeeId: object.emplid,
      enrolledCapacity: object.enrl_CAP,
      enrollmentStatus: object.enrl_STAT,
      enrolledTotal: object.enrl_TOT,
      facilityId: object.facility_ID,
      fee: object.fee,
      fri: object.meeting_TIME[0].fri,
      fullSsrComponent: object.ssr_COMPONENT_DESCR,
      geCourseAttr: object.crse_ATTR_VALUE,
      instructorAltName: object.name2,
      instructorEmployeeId: object.emplid2,
      instructionMode: object.instruction_MODE,
      instructorName: object.name,
      longDescription: object.descrlong_VC,
      mon: object.meeting_TIME[0].mon,
      profile: object.profile_PATH,
      quarter: object.strm,
      room: object.meeting_TIME[0].room,
      sat: object.meeting_TIME[0].sat,
      sbCourseZccm: object.sb_CRSE_ZCCM,
      schedulePrint: object.schedule_PRINT,
      sessionCode: object.session_CODE,
      ssrComponent: object.ssr_COMPONENT,
      subject: object.subject,
      sun: object.meeting_TIME[0].sun,
      textbook: object.book,
      thurs: object.meeting_TIME[0].thurs,
      title: object.course_TITLE_LONG,
      topic: object.crse_TOPIC_DESCR,
      tues: object.meeting_TIME[0].tues,
      waitlistCapacity: object.wait_CAP,
      waitlistTotal: object.wait_TOT,
      wed: object.meeting_TIME[0].wed,
    };
    return result;
  }

  static getAllClasses(
    onSuccess: (response: any) => void,
    onFailure: (error: string) => void,
    userInput: UserInput
  ): void {
    const params = {
      strm: userInput.getTerm(),
      class_nbr: userInput.getClassNo(),
      section_code: userInput.getSessionCode(),
      subject: userInput.getSubject().toUpperCase(),
      name: userInput.getInstructor(),
      catalog_nbr: userInput.getCourseNo().toUpperCase(),
      campus: userInput.getCampus(),
      crse_attr: userInput.getCourseAttr(),
      crse_attr_value: userInput.getGeClassesAttr(),
      meeting_time_start: '',
      ssr_component: '',
      mon: '',
      tues: '',
      wed: '',
      thurs: '',
      fri: '',
      sat: '',
      sun: '',
      instruction_mode: '',
      acad_career: userInput.getDegreeType(),
    };
    ClassSearchUtils.fetchWithArg(app.settings.getClassesUrl, params, onSuccess, onFailure);
  }

  static splitClassesWithMultipleMeetingTimes(classes: any[]): any[] {
    let splitClasses: any = [];

    for (const _class of classes) {
      const meetingTimes = _class.meeting_TIME;
      const totalNumberOfMeetingTimes = meetingTimes.length;

      if (totalNumberOfMeetingTimes <= 1) {
        splitClasses.push(_class);
      } else {
        const copyClasses = [];

        for (let i = 0; i < totalNumberOfMeetingTimes; i++) {
          const _classCopy = JSON.parse(JSON.stringify(_class));
          _classCopy.meeting_TIME = [meetingTimes[i]];
          copyClasses.push(_classCopy);
        }

        splitClasses = splitClasses.concat(copyClasses);
      }
    }

    return splitClasses;
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
    let meetingTimes = '';

    if (this.classInfo.classStartTime.length === 0 && this.classInfo.classEndTime.length === 0) {
      meetingTimes = 'N/A';
    } else if (this.classInfo.classStartTime.includes(', ') || this.classInfo.classEndTime.includes(', ')) {
      meetingTimes = this.combineStartEndTimes(this.classInfo);
    } else if (!this.areStartTimeEndTimeEmpty()) {
      meetingTimes = `${this.classInfo.classStartTime} - ${this.classInfo.classEndTime}`.toLowerCase();
    }

    return meetingTimes;
  }

  public isActive(): boolean {
    return this.classInfo.classStatus === 'Active';
  }

  public getClassStatus(): string {
    return this.classInfo.classStatus;
  }

  private areStartTimeEndTimeEmpty(): boolean {
    return this.classInfo.classStartTime.length === 0 && this.classInfo.classEndTime.length === 0;
  }

  private combineStartEndTimes(classInfo: IClass): string {
    let combinedMeetingTimes = '';
    let startTimesList = classInfo.classStartTime.split(', ');
    let endTimesList = classInfo.classEndTime.split(', ');

    if (startTimesList.length !== 1 && endTimesList.length !== 1) {
      const startEndTimesCombined = _.zip(startTimesList, endTimesList);

      startEndTimesCombined.forEach(times => {
        combinedMeetingTimes += `, ${times[0]} - ${times[1]}`.toLowerCase();
      });
    }

    return _.trim(combinedMeetingTimes, ', ');
  }
}
