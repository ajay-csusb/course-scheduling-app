import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { UserInput } from './UserInput';
import { Toaster, Position, Intent, IOptionProps } from '@blueprintjs/core';
import * as ClassSearchUtils from './ClassSearchUtils';
import { MeetingTime } from './MeetingTime';
interface IClassSearchContainerState {
  quarter: string;
  campus: string;
  subject: ISubject;
  courseNo: string;
  startTime: Date;
  endTime: Date;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  geClasses: boolean;
  isReset: boolean;
  isLoading: boolean;
  beforeSubmit: boolean;
  noClasses: boolean;
  courseAttr: string;
  sessionCode: string;
  classNo: string;
}
export class ClassSearchContainer extends React.Component<{}, IClassSearchContainerState> {

  private allResults: IClass[];

  private instructors: string[];

  private subjects: ISubject[];

  private courseAttr: IOptionProps[];

  private readonly dropDownUrl = 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList ';

  constructor(props: any) {
    super(props);
    this.state = this.defaultFormValues();
    this.updateQuarter = this.updateQuarter.bind(this);
    this.updateCampus = this.updateCampus.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
    this.updateMeetingDate = this.updateMeetingDate.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.updateCourseNo = this.updateCourseNo.bind(this);
    this.updateInstructionMode = this.updateInstructionMode.bind(this);
    this.updateInstructorName = this.updateInstructorName.bind(this);
    this.updateLoadingMessage = this.updateLoadingMessage.bind(this);
    this.updateCourseAttr = this.updateCourseAttr.bind(this);
    this.updateSessionCode = this.updateSessionCode.bind(this);
    this.updateClassNo = this.updateClassNo.bind(this);
    this.instructorsFound = this.instructorsFound.bind(this);
    this.subjectsFound = this.subjectsFound.bind(this);
    this.processDropDownListData = this.processDropDownListData.bind(this);
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.classesFound = this.classesFound.bind(this);
    this.classesNotFound = this.classesNotFound.bind(this);
    this.allResults = [];
    this.instructors = [];
    this.subjects = [];
    this.courseAttr = [
      { label: 'All', value: '' },
      { label: 'Early Start Program', value: 'ESP' },
      { label: 'Fully On line', value: 'FONL' },
      { label: 'General Education', value: 'GE' },
      { label: 'Service Learning', value: 'CSLI' },
      { label: 'Study Abroad', value: 'SA' },
      { label: 'Zero Cost Course Materials', value: 'ZCCM' },
      { label: 'eBook', value: 'EBK' },
    ];
  }

  public render(): JSX.Element {
    const classSearchResultsComponent = this.getClassSearchResultsComponent();
    const classSearchFormComponent = this.getClassSearchFormComponent();
    return (
      <div>
        {classSearchFormComponent}
        {this.isLoadingClasses() && <p>Loading...</p>}
        {((this.didSubmit() && !this.hasNoClasses()) || (this.didSubmit() && !this.isLoadingClasses())) && classSearchResultsComponent}
      </div>
    );
  }
  componentDidMount() {
    ClassSearchUtils.fetchData(this.dropDownUrl, this.processDropDownListData, this.errorProcessingData);
  }

  componentDidUpdate() {
    if (this.resetComplete()) {
      this.setState({
        isReset: false,
      });
    }
  }

  private updateQuarter(e: any): void {
    this.setState({
      quarter: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateCampus(e: any): void {
    this.setState({
      campus: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateMeetingDate(e: any): void {
    const checkBoxValue = e.target.value;
    this.setState({
      meetingDate: {
        all: this.toggleAllMeetingDate(checkBoxValue),
        mon: this.toggleMon(checkBoxValue),
        tue: this.toggleTue(checkBoxValue),
        wed: this.toggleWed(checkBoxValue),
        thu: this.toggleThu(checkBoxValue),
        fri: this.toggleFri(checkBoxValue),
        sat: this.toggleSat(checkBoxValue),
        sun: this.toggleSun(checkBoxValue),
      },
      beforeSubmit: true,
    });
  }

  private updateSubject(subject: ISubject): void {
    this.setState({
      subject: subject,
      beforeSubmit: true,
    });
  }

  private updateCourseNo(e: any): void {
    this.setState({
      courseNo: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateInstructionMode(e: any): void {
    this.setState({
      instructionMode: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateInstructorName(instructor: string): void {
    this.setState({
      instructorName: instructor,
      beforeSubmit: true,
    });
  }

  private toggleAllMeetingDate(checkBoxValue: string): boolean {
    if (checkBoxValue === 'all') {
      if (this.state.meetingDate.all) {
        return false;
      }
      return true;
    }
    return false;
  }

  private toggleMon(checkBoxValue: string): boolean {
    if (checkBoxValue === 'mon') {
      if (this.state.meetingDate.mon) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.mon;
  }
  private toggleTue(checkBoxValue: string): boolean {
    if (checkBoxValue === 'tue') {
      if (this.state.meetingDate.tue) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.tue;
  }
  private toggleWed(checkBoxValue: string): boolean {
    if (checkBoxValue === 'wed') {
      if (this.state.meetingDate.wed) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.wed;
  }
  private toggleThu(checkBoxValue: string): boolean {
    if (checkBoxValue === 'thu') {
      if (this.state.meetingDate.thu) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.thu;
  }
  private toggleFri(checkBoxValue: string): boolean {
    if (checkBoxValue === 'fri') {
      if (this.state.meetingDate.fri) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.fri;
  }
  private toggleSat(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sat') {
      if (this.state.meetingDate.sat) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.sat;
  }
  private toggleSun(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sun') {
      if (this.state.meetingDate.sun) {
        return false;
      }
      return true;
    }
    return this.state.meetingDate.sun;
  }

  private classesFound(data: any): void {
    const transformedClass: IClass[] = [];
    const classes = data.contentList;
    this.allResults = [];
    if (classes === null || classes.length === 0) {
      this.setState({
        noClasses: true,
        isLoading: false,
      });
      return;
    }
    if (classes !== null && classes.length !== 0) {
      classes.forEach((_class: any) => {
        transformedClass.push(Class.transformToClass(_class));
      });
    }
    this.allResults = MeetingTime.filter(transformedClass, this.state.startTime, this.state.endTime);
    this.setState({
      noClasses: false,
      isLoading: false,
    });
  }

  private classesNotFound(_error: string): void {
    this.setState({
      noClasses: true,
      isLoading: false,
    });
  }

  private onSubmit(_e: any): any {
    if (this.isSubjectEmpty()) {
      return this.displayErrorMessageWhenSubjectIsEmpty();
    }
    this.allResults = [];
    this.setState({
      beforeSubmit: false,
      isLoading: true,
    }, () => {
      this.updateAllClasses();
      }
    );
  }

  private onReset(_e: any): void {
    this.setState(this.defaultFormValues());
    this.setState({
      isReset: true,
    });
  }

  private defaultFormValues(): IClassSearchContainerState {
    return {
      quarter: 'current',
      campus: 'both',
      subject: {
        name: '',
        abbr: '',
      },
      courseNo: '',
      startTime: new Date('1899-01-01T00:00:00'),
      endTime: new Date('1899-01-01T23:00:00'),
      meetingDate: {
        all: true,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      instructionMode: 'all',
      instructorName: '',
      geClasses: false,
      isReset: false,
      isLoading: false,
      beforeSubmit: true,
      noClasses: false,
      courseAttr: 'all',
      sessionCode: 'all',
      classNo: '',
    };
  }

  private instructorsFound(data: any): void {
    const instructorsArr: any[] = [];
    instructorsArr.push('All');
    if (data !== undefined && data.instructorList !== undefined) {
      data.instructorList.forEach((_instructor: any) => {
        instructorsArr.push(_instructor.name);
      });
      this.instructors = instructorsArr;
      this.setState({ isLoading: false });
    }
  }

  private subjectsFound(data: any): void {
    const subjects: ISubject[] = [];
    const noOption: ISubject = {
      abbr: 'all',
      name: 'All',
    };
    subjects.push(noOption);
    const subjectsArr = data.abbreviationList;
    if (subjectsArr !== undefined) {
      subjectsArr.forEach((_subject: any) => {
        const subject: ISubject = {
          abbr: '',
          name: '',
        };
        subject.abbr = _subject.subject;
        subject.name = _subject.subject_DESC;
        subjects.push(subject);
      });
      this.subjects = subjects;
    }
    this.setState({ isLoading: false });
  }

  private updateStartTime(e: Date): void {
    this.setState({
      startTime: e,
      beforeSubmit: true,
    });
  }

  private updateEndTime(e: Date): void {
    this.setState({
      endTime: e,
      beforeSubmit: true,
    });
  }

  private resetComplete() {
    return (this.state.isReset && this.state.beforeSubmit && this.state.subject.abbr.length === 0);
  }

  private isSubjectEmpty() {
    return (this.state.subject.abbr.length === 0);
  }

  private displayErrorMessageWhenSubjectIsEmpty(): string {
    return (
      Toaster.create({
        className: 'select-a-subject',
        position: Position.BOTTOM,
      }).show({ message: 'Please choose a subject', intent: Intent.DANGER, timeout: 2000 })
    );
  }

  private hasNoClasses(): boolean {
    return this.isPageLoad() || this.state.noClasses;
  }

  private isPageLoad(): boolean {
    return (!this.state.noClasses && this.allResults.length === 0);
  }

  private getClassSearchResultsComponent(): JSX.Element {
    return (
      <ClassSearchResults
        classes={this.allResults}
        quarter={this.state.quarter}
        subject={this.state.subject}
        courseNo={this.state.courseNo}
        campus={this.state.campus}
        meetingDate={this.state.meetingDate}
        instructionMode={this.state.instructionMode}
        instructorName={this.state.instructorName}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        isLoading={this.state.isLoading}
        onChangeOfLoadingMessage={this.updateLoadingMessage}
      />
    );
  }

  private getClassSearchFormComponent(): JSX.Element {
    return (
      <ClassSearchForm
        quarter={this.state.quarter}
        campus={this.state.campus}
        subjects={this.subjects}
        meetingDate={this.state.meetingDate}
        instructionMode={this.state.instructionMode}
        instructors={this.instructors}
        isReset={this.state.isReset}
        onChangeOfQuarter={this.updateQuarter}
        onChangeOfCampus={this.updateCampus}
        onChangeOfStartTime={this.updateStartTime}
        onChangeOfEndTime={this.updateEndTime}
        onChangeOfMeetingDate={this.updateMeetingDate}
        onChangeOfSubject={this.updateSubject}
        onChangeOfCourseNo={this.updateCourseNo}
        onChangeOfInstructionMode={this.updateInstructionMode}
        onChangeOfInstructor={this.updateInstructorName}
        onChangeOfCourseAttr={this.updateCourseAttr}
        onChangeOfSessionCode={this.updateSessionCode}
        onChangeOfClassNo={this.updateClassNo}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        courseNo={this.state.courseNo}
        courseAttr={this.courseAttr}
        classNo={this.state.classNo}
      />
    );
  }

  private isLoadingClasses(): boolean {
    return this.state.isLoading;
  }

  private didSubmit(): boolean {
    return !this.state.beforeSubmit;
  }

  private updateLoadingMessage(): void {
    if (this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }
  }

  private updateCourseAttr(e: any) {
    this.setState({
      courseAttr: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateSessionCode(e: any) {
    this.setState({
      sessionCode: e.target.value,
      beforeSubmit: true,
    });
  }

  private updateClassNo(e: any) {
    this.setState({
      classNo: e.target.value,
      beforeSubmit: true,
    });
  }

  private processDropDownListData(data: any): void {
    this.instructorsFound(data);
    this.subjectsFound(data);
  }

  private errorProcessingData(_error: any): void {
    console.log('error processing drop down data: ' + _error);
  }

  private updateAllClasses() {
    const userInput = new UserInput(
      this.state.campus, this.state.meetingDate, this.state.subject, this.state.courseNo, this.state.quarter,
      this.state.startTime, this.state.endTime, this.state.instructionMode, this.state.instructorName,
      this.state.courseAttr, this.state.classNo, this.state.sessionCode);
    Class.getAllClasses(this.classesFound, this.classesNotFound, userInput);
  }

}
