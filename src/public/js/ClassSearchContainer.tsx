import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { UserInput } from './UserInput';
import { Intent, IOptionProps, Callout } from '@blueprintjs/core';
import * as ClassSearchUtils from './ClassSearchUtils';
import { MeetingTime } from './MeetingTime';
interface IClassSearchContainerState {
  term: string;
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
  showErrorMessage: boolean;
  degreeType: string;
}
export class ClassSearchContainer extends React.Component<{}, IClassSearchContainerState> {

  private allResults: IClass[];

  private instructors: string[];

  private subjects: ISubject[];

  private term: IOptionProps[];

  private currentTermId: string;

  private readonly dropDownUrl = 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList ';

  constructor(props: any) {
    super(props);
    this.state = this.defaultFormValues();
    this.updateTerm = this.updateTerm.bind(this);
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
    this.updateDegreeType = this.updateDegreeType.bind(this);
    this.instructorsFound = this.instructorsFound.bind(this);
    this.subjectsFound = this.subjectsFound.bind(this);
    this.termFound = this.termFound.bind(this);
    this.processDropDownListData = this.processDropDownListData.bind(this);
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.classesFound = this.classesFound.bind(this);
    this.classesNotFound = this.classesNotFound.bind(this);
    this.allResults = [];
    this.instructors = [];
    this.subjects = [];
    this.term = [];
    this.currentTermId = '';
  }

  public render(): JSX.Element {
    const classSearchResultsComponent = this.getClassSearchResultsComponent();
    const classSearchFormComponent = this.getClassSearchFormComponent();
    const errorMessage: JSX.Element = this.displayErrorMessageWhenSubjectIsEmpty();

    return (
      <div>
        {this.state.showErrorMessage && errorMessage}
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

  private updateTerm(e: any): void {
    this.setState({
      term: e.target.value,
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
      this.setState({
        showErrorMessage: true,
      });
      return this.displayErrorMessageWhenSubjectIsEmpty();
    }
    this.allResults = [];
    this.setState({
      showErrorMessage: false,
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
      term: this.currentTermId,
      campus: 'both',
      subject: {
        name: '',
        abbr: '',
      },
      courseNo: '',
      startTime: new Date('1899-01-01T00:00:00'),
      endTime: new Date('1899-01-01T23:00:00'),
      meetingDate: {
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
      showErrorMessage: false,
      degreeType: 'all',
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

  private termFound(data: any): void {
    const terms = data.termList;
    const termArr: IOptionProps[] = [];
    terms.forEach((_term: any) => {
      if (this.hasCurrentQuarterFlag(_term)) {
        this.currentTermId = _term.strm;
      }
      termArr.push({
        label: _term.display_STR, value: _term.strm,
      });
    });
    this.term = termArr;
    this.setState({
      // @Todo unit test this.
      term: this.currentTermId,
      isLoading: false,
    });
  }

  private hasCurrentQuarterFlag(quarter: any): boolean {
    return (quarter.displayed_FLAG === 'Y' && quarter.default_FLG === 'Y');
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

  private displayErrorMessageWhenSubjectIsEmpty(): JSX.Element {
    return (
      <Callout intent={Intent.WARNING}>
        Please select a Subject
      </Callout >
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
        onChangeOfLoadingMessage={this.updateLoadingMessage}
      />
    );
  }

  private getClassSearchFormComponent(): JSX.Element {
    return (
      <ClassSearchForm
        term={this.term}
        campus={this.state.campus}
        subjects={this.subjects}
        meetingDate={this.state.meetingDate}
        instructionMode={this.state.instructionMode}
        instructors={this.instructors}
        isReset={this.state.isReset}
        onChangeOfTerm={this.updateTerm}
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
        classNo={this.state.classNo}
        courseAttr={this.state.courseAttr}
        sessionCode={this.state.sessionCode}
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
    let selectedValue = e.target.value;
    if (selectedValue === 'UGRD' || selectedValue === 'PBAC' || selectedValue === 'EXED') {
      this.updateDegreeType(selectedValue);
      selectedValue = 'all';
    }
    this.setState({
      courseAttr: selectedValue,
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

  private updateDegreeType(value: string) {
    this.setState({
      degreeType: value,
      beforeSubmit: true,
    });
  }

  private processDropDownListData(data: any): void {
    this.termFound(data);
    this.instructorsFound(data);
    this.subjectsFound(data);
  }

  private errorProcessingData(_error: any): void {
    console.log('error processing drop down data: ' + _error);
  }

  private updateAllClasses() {
    const userInput = new UserInput(
      this.state.campus, this.state.meetingDate, this.state.subject, this.state.courseNo, this.state.term,
      this.state.startTime, this.state.endTime, this.state.instructionMode, this.state.instructorName,
      this.state.courseAttr, this.state.classNo, this.state.sessionCode);
    userInput.setDegreeType(this.state.degreeType);
    Class.getAllClasses(this.classesFound, this.classesNotFound, userInput);
  }

}
