import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { UserInput } from './UserInput';
import { Intent, IOptionProps, Callout, Spinner } from '@blueprintjs/core';
import * as ClassSearchUtils from './ClassSearchUtils';
import { MeetingTime } from './MeetingTime';
import { Watchdog } from './Watchdog';
import { InstructionMode } from './InstructionMode';
import { FilterClasses } from './FilterClasses';

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
  geClassesAttribute: string;
  isReset: boolean;
  isLoading: boolean;
  beforeSubmit: boolean;
  noClasses: boolean;
  courseAttr: string;
  sessionCode: string;
  classNo: string;
  showErrorMessage: boolean;
  degreeType: string;
  forceReload: boolean;
}
export class ClassSearchContainer extends React.Component<{}, IClassSearchContainerState> {

  private allResults: IClass[];

  private instructors: string[];

  private subjects: ISubject[];

  private term: IOptionProps[];

  private geClassesAttributes: IOptionProps[];

  private currentTermId: string;

  private readonly dropDownUrl = 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList';

  private userInput: UserInput;

  private resultsSection: any;

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
    this.updateGeClassAttr = this.updateGeClassAttr.bind(this);
    this.instructorsFound = this.instructorsFound.bind(this);
    this.subjectsFound = this.subjectsFound.bind(this);
    this.termFound = this.termFound.bind(this);
    this.processDropDownListData = this.processDropDownListData.bind(this);
    this.errorProcessingData = this.errorProcessingData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.classesFound = this.classesFound.bind(this);
    this.classesNotFound = this.classesNotFound.bind(this);
    this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    this.allResults = [];
    this.instructors = [];
    this.subjects = [];
    this.term = [];
    this.geClassesAttributes = [];
    this.currentTermId = '';
    this.userInput = new UserInput();
    this.resultsSection = React.createRef();
  }

  public render(): JSX.Element {
    const classSearchResultsComponent = this.getClassSearchResultsComponent();
    const classSearchFormComponent = this.getClassSearchFormComponent();
    const errorMessage: JSX.Element = this.displayErrorMessageWhenSubjectIsEmpty();
    return (
      <React.Fragment>
        <div className="form-section">
          <div className="container">
            {this.state.showErrorMessage && errorMessage}
            {classSearchFormComponent}
          </div>
        </div>
        {this.isLoadingClasses() && <Spinner intent={Intent.PRIMARY} size={25} />}
        {((this.didSubmit() && !this.hasNoClasses()) || (this.didSubmit() && !this.isLoadingClasses())) && classSearchResultsComponent}
      </React.Fragment>
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
    if (this.state.forceReload) {
      this.setState({
        forceReload: false,
      });
    }
  }

  private updateTerm(e: any): void {
    this.setState({
      term: e.target.value,
    });
  }

  private updateCampus(e: any): void {
    this.setState({
      campus: e.target.value,
    });
    this.userInput.setCampus(e.target.value);
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
    });
  }

  private updateSubject(subject: ISubject): void {
    this.setState({
      subject: subject,
    });
  }

  private updateCourseNo(e: any): void {
    this.setState({
      courseNo: e.target.value,
    });
    this.userInput.setCourseNo(e.target.value);
  }

  private updateInstructionMode(e: any): void {
    this.setState({
      instructionMode: e.target.value,
    });
    this.userInput.setInstructionMode(e.target.value);
  }

  private updateInstructorName(instructor: string): void {
    this.setState({
      instructorName: instructor,
    });
  }

  private toggleMon(checkBoxValue: string): boolean {
    if (checkBoxValue === 'mon') {
      return (!this.state.meetingDate.mon);
    }
    return this.state.meetingDate.mon;
  }
  private toggleTue(checkBoxValue: string): boolean {
    if (checkBoxValue === 'tue') {
      return (!this.state.meetingDate.tue);
    }
    return this.state.meetingDate.tue;
  }
  private toggleWed(checkBoxValue: string): boolean {
    if (checkBoxValue === 'wed') {
      return (!this.state.meetingDate.wed);
    }
    return this.state.meetingDate.wed;
  }
  private toggleThu(checkBoxValue: string): boolean {
    if (checkBoxValue === 'thu') {
      return (!this.state.meetingDate.thu);
    }
    return this.state.meetingDate.thu;
  }
  private toggleFri(checkBoxValue: string): boolean {
    if (checkBoxValue === 'fri') {
      return (!this.state.meetingDate.fri);
    }
    return this.state.meetingDate.fri;
  }
  private toggleSat(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sat') {
      return (!this.state.meetingDate.sat);
    }
    return this.state.meetingDate.sat;
  }
  private toggleSun(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sun') {
      return (!this.state.meetingDate.sun);
    }
    return this.state.meetingDate.sun;
  }

  private classesFound(classes: any): void {
    const transformedClass: IClass[] = [];
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

    const validClasses = this.filterClasses(transformedClass);
    const sortedClasses = this.sortClasses(validClasses);
    this.allResults = this.processCourseAttributes(sortedClasses);
    this.setState({
      noClasses: false,
      isLoading: false,
    });
    this.resultsSection.current.scrollIntoView();
  }

  private filterClasses(classes: IClass[]): IClass[] {
    const activeClasses = FilterClasses.filterByActiveClasses(classes)
    const filteredClasses = MeetingTime.filter(activeClasses, this.state.startTime, this.state.endTime);
    return InstructionMode.filter(filteredClasses, this.state.instructionMode);
  }

  private sortClasses(classes: IClass[]): IClass[] {
    return ClassSearchUtils.sortClasses(classes);
  }

  private processCourseAttributes(classes: IClass[]): IClass[] {
    return ClassSearchUtils.parseCourseAttributes(classes, this.geClassesAttributes);
  }

  private classesNotFound(_error: any): void {
    const errorMsg = {
      name: Error().name,
      msg: _error.message,
      stack: Error().stack,
    };
    Watchdog.log(errorMsg);
    this.setState({
      noClasses: true,
      isLoading: false,
    });
  }

  private onSubmit(): any {
    if (this.isSubjectEmpty() && this.areOtherFieldsEmpty()) {
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

  private onReset(): void {
    this.setState(this.defaultFormValues());
    this.setState({
      isReset: true,
    }, () => {
      this.userInput = new UserInput();
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
      geClassesAttribute: '',
      forceReload: false,
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
      this.setState({ forceReload: true});
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
    this.setState({ forceReload: true});
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
      forceReload: true,
    });
  }

  private hasCurrentQuarterFlag(quarter: any): boolean {
    return (quarter.displayed_FLAG === 'Y' && quarter.default_FLG === 'Y');
  }

  private updateStartTime(e: Date): void {
    this.setState({
      startTime: e,
    });
    this.userInput.setStartTime(e);
  }

  private updateEndTime(e: Date): void {
    this.setState({
      endTime: e,
    });
    this.userInput.setEndTime(e);
  }

  private resetComplete() {
    return (this.state.isReset && this.state.beforeSubmit && this.state.subject.abbr.length === 0);
  }

  private isSubjectEmpty(): boolean {
    return (this.state.subject.abbr.length === 0);
  }

  private isInstructorEmpty(): boolean {
    return (this.state.instructorName === '');
  }

  private isCourseNumberEmpty(): boolean {
    return (this.state.courseNo === '');
  }

  private isMeetingDayEmpty(): boolean {
    return (!this.state.meetingDate.mon
    && !this.state.meetingDate.tue
    && !this.state.meetingDate.wed
    && !this.state.meetingDate.thu
    && !this.state.meetingDate.fri
    && !this.state.meetingDate.sat
    && !this.state.meetingDate.sun);
  }

  private isClassNoEmpty(): boolean {
    return (this.state.classNo === '');
  }

  private isValidInstructionModeSelected(): boolean {
    return (this.state.instructionMode !== 'all'
      && this.state.instructionMode !== 'p'
      && this.state.instructionMode !== 'ol'
    );
  }

  private isGeClassesAttributeEmpty(): boolean {
    return (this.state.geClassesAttribute === '');
  }

  private areOtherFieldsEmpty(): boolean {
    if (!this.isInstructorEmpty()) {
      return false;
    }
    if (!this.isCourseNumberEmpty()) {
      return false;
    }
    if (!this.isMeetingDayEmpty()) {
      return false;
    }
    if (!this.isClassNoEmpty()) {
      return false;
    }
    if (this.isValidInstructionModeSelected()) {
      return false;
    }
    if (!this.isGeClassesAttributeEmpty()) {
      return false;
    }
    return true;
  }

  private displayErrorMessageWhenSubjectIsEmpty(): JSX.Element {
    return (
      <Callout className="subject-validation" intent={Intent.WARNING}>
        Please select a Course Subject
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
      <React.Fragment>
        <div ref={this.resultsSection} />
        <ClassSearchResults
          classes={this.allResults}
          currentTerm={this.currentTermId}
          onChangeOfLoadingMessage={this.updateLoadingMessage}
        />
      </React.Fragment>
    );
  }

  private getClassSearchFormComponent(): JSX.Element {
    // @Todo subjects, instructors and terms can be abstracted into
    // a new class.
    return (
      <ClassSearchForm
        term={this.term}
        campus={this.state.campus}
        subjects={this.subjects}
        meetingDate={this.state.meetingDate}
        instructionMode={this.state.instructionMode}
        instructors={this.instructors}
        geClassesAttribute={this.state.geClassesAttribute}
        geClassesAttributes={this.geClassesAttributes}
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
        onChangeOfGeClassesAttribute={this.updateGeClassAttr}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        onKeyDown={this.onEnterKeyPress}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        courseNo={this.state.courseNo}
        classNo={this.state.classNo}
        courseAttr={this.state.courseAttr}
        sessionCode={this.state.sessionCode}
        currentTermId={this.state.term}
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
    const selectedValue = e.target.value;
    // @Todo simplify this.
    this.updateDegreeType('all');
    if (this.isDegreeType(selectedValue)) {
      this.updateDegreeType(selectedValue);
      return;
    }
    this.setState({
      courseAttr: selectedValue,
    });
    this.userInput.setCourseAttr(selectedValue);
  }

  private updateSessionCode(e: any) {
    this.setState({
      sessionCode: e.target.value,
    });
    this.userInput.setSessionCode(e.target.value);
  }

  private updateClassNo(e: any) {
    this.setState({
      classNo: e.target.value,
    });
    this.userInput.setClassNo(e.target.value);
  }

  private updateDegreeType(value: string) {
    this.setState({
      degreeType: value,
    });
    this.userInput.setDegreeType(value);
  }

  private updateGeClassAttr(e: any) {
    this.setState({
      geClassesAttribute: e.target.value,
    });
    this.userInput.setGeClassesAttr(e.target.value);
  }

  private processDropDownListData(data: any): void {
    this.termFound(data);
    this.instructorsFound(data);
    this.subjectsFound(data);
    this.geClassesAttributesFound(data);
  }

  private errorProcessingData(_error: any): void {
    const errorMsg = {
      name: Error().name,
      msg: _error.message,
      stack: Error().stack,
    };
    Watchdog.log(errorMsg);
  }

  private updateAllClasses() {
    this.userInput.setTerm(this.state.term);
    this.userInput.setInstructor(this.state.instructorName);
    this.userInput.setSubject(this.state.subject.abbr);
    this.userInput.setMeetingDay(this.state.meetingDate);
    Class.getAllClasses(this.classesFound, this.classesNotFound, this.userInput);
  }

  private onEnterKeyPress(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  private isDegreeType(degreeAbbr: string): boolean {
    return (degreeAbbr === 'UGRD' || degreeAbbr === 'PBAC' || degreeAbbr === 'EXED');
  }

  private geClassesAttributesFound(data: any): void {
    const geClasses = data.classAttributeList;
    const noOption: IOptionProps = {
      value: '',
      label: 'All',
    };
    this.geClassesAttributes.push(noOption);
    geClasses.forEach((attribute: any) => {
      if (attribute.crse_ATTR === 'GE') {
        this.geClassesAttributes.push({
          label: attribute.descr,
          value: attribute.descr.split(' ')[0],
        });
      }
    });
    this.setState({
      forceReload: true,
    });
  }

}
