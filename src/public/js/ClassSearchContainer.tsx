import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingDate } from './Class';
import { Instructor } from './Instructor';
import { Subject, ISubject } from './Subject';
import { UserInput } from './UserInput';
import { FilterClasses } from './FilterClasses';
import { Toaster, Position, Intent } from '@blueprintjs/core';
interface IClassSearchContainerState {
  updateAllResults: boolean;
  quarter: string;
  campus: string;
  subject: ISubject;
  courseNo: string;
  startTime: Date;
  endTime: Date;
  showGeClasses: boolean;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  geClasses: boolean;
  isReset: boolean;
  isLoading: boolean;
  beforeSubmit: boolean;
  noClasses: boolean;
}
export class ClassSearchContainer extends React.Component<{}, IClassSearchContainerState> {

  private allResults: IClass[];

  private instructors: string[];

  private subjects: ISubject[];
  constructor(props: any) {
    super(props);
    this.state = this.defaultFromValues();
    this.updateQuarter = this.updateQuarter.bind(this);
    this.updateCampus = this.updateCampus.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
    this.updateToggleGeClasses = this.updateToggleGeClasses.bind(this);
    this.updateMeetingDate = this.updateMeetingDate.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.updateCourseNo = this.updateCourseNo.bind(this);
    this.updateInstructionMode = this.updateInstructionMode.bind(this);
    this.updateInstructorName = this.updateInstructorName.bind(this);
    this.instructorsFound = this.instructorsFound.bind(this);
    this.instructorsNotFound = this.instructorsNotFound.bind(this);
    this.subjectsFound = this.subjectsFound.bind(this);
    this.subjectsNotFound = this.subjectsNotFound.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.classesFound = this.classesFound.bind(this);
    this.classesNotFound = this.classesNotFound.bind(this);
    this.allResults = [];
    this.instructors = [];
    this.subjects = [];
  }

  public render(): JSX.Element {
    const classSearchResultsComponent = this.getClassSearchResultsComponent();
    const classSearchFormComponent = this.getClassSearchFormComponent();
    return (
      <div>
        {classSearchFormComponent}
        {(this.hasNoClasses() && this.didSubmit() && !this.isLoadingClasses()) && <p>No classes found.</p>}
        {this.isLoadingClasses() && <p>Loading...</p>}
        {(this.didSubmit() && !this.hasNoClasses()) && classSearchResultsComponent}
      </div>
    );
  }
  componentDidMount() {
    Subject.getAllSubjects(this.subjectsFound, this.subjectsNotFound);
    Instructor.getAllInstructors(this.instructorsFound, this.instructorsNotFound);
  }

  componentDidUpdate(_prevProps: any, prevState: any, _snapshot: any) {
    if (this.didSubjectChange(prevState)) {
      this.updateClasses();
    }
    if (this.resetComplete()) {
      this.setState({
        isReset: false,
      });
    }
  }

  private updateQuarter(e: any): void {
    this.setState({
      quarter: e.target.value,
    });
  }

  private updateCampus(e: any): void {
    this.setState({
      campus: e.target.value,
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
    });
  }

  private updateSubject(subject: ISubject): void {
    this.setState({
      subject: subject,
      isLoading: this.didSubmit() ? true : false,
    });
  }

  private updateCourseNo(e: any): void {
    this.setState({
      courseNo: e.target.value,
    });
  }

  private updateInstructionMode(e: any): void {
    this.setState({
      instructionMode: e.target.value,
    });
  }

  private updateInstructorName(instructor: string): void {
    this.setState({
      instructorName: instructor,
    });
  }

  private updateToggleGeClasses(_e: any): void {
    this.setState(prevState => ({
      showGeClasses: !prevState.showGeClasses,
    }));
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
    this.allResults = transformedClass;
    this.setState({
      noClasses: false,
      isLoading: false,
    });
  }

  private classesNotFound(error: string): void {
    console.log(error);
  }

  private onSubmit(_e: any): void {
    const userInput = new UserInput(
      this.state.campus, this.state.meetingDate, this.state.subject, this.state.courseNo, this.state.quarter,
      this.state.startTime, this.state.endTime, this.state.instructionMode, this.state.instructorName,
      this.state.geClasses);
    const filteredResults: IClass[] = FilterClasses.filter(this.allResults, userInput);
    this.allResults = filteredResults;
    if (this.isSubjectEmpty()) {
      this.displayErrorMessageWhenSubjectIsEmpty();
    }
    this.setState({
      beforeSubmit: false,
    });
    if (this.hasNoClasses()) {
      this.setState({
        isLoading: (!this.state.noClasses) ? true : false,
      });
    }
  }

  private onReset(_e: any): void {
    this.setState(this.defaultFromValues());
    this.setState({
      isReset: true,
    });
  }

  private defaultFromValues(): IClassSearchContainerState {
    return {
      updateAllResults: false,
      quarter: 'current',
      campus: 'both',
      subject: {
        name: '',
        abbr: '',
      },
      courseNo: '',
      startTime: new Date('1899-01-01T08:00:00'),
      endTime: new Date('1899-01-01T20:00:00'),
      showGeClasses: false,
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

  private instructorsNotFound(error: string): void {
    console.log(error);
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

  private subjectsNotFound(error: string): void {
    console.log(error);
  }

  private updateStartTime(e: Date): void {
    this.setState({
      startTime: e,
    });
  }

  private updateEndTime(e: Date): void {
    this.setState({
      endTime: e,
    });
  }

  private didSubjectChange(prevState: any) {
    const prevSubject = prevState.subject.abbr;
    const currentSubject = this.state.subject.abbr;
    return (prevSubject !== currentSubject);
  }

  private updateClasses(): void {
    this.allResults = [];
    if (this.isSubjectEmpty()) {
      return;
    }
    const userInput = new UserInput(
      this.state.campus, this.state.meetingDate, this.state.subject, this.state.courseNo, this.state.quarter,
      this.state.startTime, this.state.endTime, this.state.instructionMode, this.state.instructorName,
      this.state.geClasses);
    Class.getAllClasses(this.classesFound, this.classesNotFound, userInput);
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
        geClasses={this.state.showGeClasses}
        isLoading={this.state.isLoading}
      />
    );
  }

  private getClassSearchFormComponent(): JSX.Element {
    return (
      <ClassSearchForm
        quarter={this.state.quarter}
        campus={this.state.campus}
        subjects={this.subjects}
        showGeClasses={this.state.showGeClasses}
        meetingDate={this.state.meetingDate}
        instructionMode={this.state.instructionMode}
        instructors={this.instructors}
        isReset={this.state.isReset}
        onChangeOfQuarter={this.updateQuarter}
        onChangeOfCampus={this.updateCampus}
        onChangeOfStartTime={this.updateStartTime}
        onChangeOfEndTime={this.updateEndTime}
        toggleGeClasses={this.updateToggleGeClasses}
        onChangeOfMeetingDate={this.updateMeetingDate}
        onChangeOfSubject={this.updateSubject}
        onChangeOfCourseNo={this.updateCourseNo}
        onChangeOfInstructionMode={this.updateInstructionMode}
        onChangeOfInstructor={this.updateInstructorName}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        courseNo={this.state.courseNo}
      />
    );
  }

  private isLoadingClasses(): boolean {
    return this.state.isLoading;
  }

  private didSubmit(): boolean {
    return !this.state.beforeSubmit;
  }
}
