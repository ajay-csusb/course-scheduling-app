import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingDate, ICareerLevels } from './Class';
import { ISubject, Subject } from './Subject';
import { UserInput } from './UserInput';
import { Intent, IOptionProps, Callout, Spinner } from '@blueprintjs/core';
import * as ClassSearchUtils from './ClassSearchUtils';
import * as Watchdog from './Watchdog';
import * as FilterClasses from './FilterClasses';
import { GeCourseAttribute } from './GeCourseAttribute';
import { app } from './ClassSearch.d';

export interface IClassSearchContainerState {
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
  showOpenClasses: boolean;
  careerLevelOptions: ICareerLevels;
}
export class ClassSearchContainer extends React.Component<{}, IClassSearchContainerState> {
  private allResults: IClass[];

  private instructors: string[];

  private subjects: ISubject[];

  private term: IOptionProps[];

  private geClassesAttributes: IOptionProps[];

  private currentTermId: string;

  private userInput: UserInput;

  private resultsSection: any;

  private allSubjects: any;

  constructor(props: any) {
    super(props);
    this.state = this.setDefaultState();
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
    this.updateSubjectDropdown = this.updateSubjectDropdown.bind(this);
    this.updateOpenClasses = this.updateOpenClasses.bind(this);
    this.updateCareerLevelOptions = this.updateCareerLevelOptions.bind(this);
    this.allResults = [];
    this.instructors = [];
    this.subjects = [];
    this.term = [];
    this.geClassesAttributes = [];
    this.currentTermId = '';
    this.userInput = new UserInput();
    this.resultsSection = React.createRef();
    this.allSubjects = '';
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
        {((this.didSubmit() && !this.hasNoClasses()) || (this.didSubmit() && !this.isLoadingClasses())) &&
          classSearchResultsComponent}
        <a
          target="_blank"
          href="https://www.csusb.edu/its/support/digital-transformation/web-services/form/feedback-class-search"
          className="feedback-btn"
        >
          <i className="fas fa-smile"></i> Feedback
        </a>
      </React.Fragment>
    );
  }
  componentDidMount() {
    ClassSearchUtils.fetchData(app.settings.dropdownUrl, this.processDropDownListData, this.errorProcessingData);
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
    this.updateSubjectDropdown(e.target.value);
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
      return !this.state.meetingDate.mon;
    }
    return this.state.meetingDate.mon;
  }
  private toggleTue(checkBoxValue: string): boolean {
    if (checkBoxValue === 'tue') {
      return !this.state.meetingDate.tue;
    }
    return this.state.meetingDate.tue;
  }
  private toggleWed(checkBoxValue: string): boolean {
    if (checkBoxValue === 'wed') {
      return !this.state.meetingDate.wed;
    }
    return this.state.meetingDate.wed;
  }
  private toggleThu(checkBoxValue: string): boolean {
    if (checkBoxValue === 'thu') {
      return !this.state.meetingDate.thu;
    }
    return this.state.meetingDate.thu;
  }
  private toggleFri(checkBoxValue: string): boolean {
    if (checkBoxValue === 'fri') {
      return !this.state.meetingDate.fri;
    }
    return this.state.meetingDate.fri;
  }
  private toggleSat(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sat') {
      return !this.state.meetingDate.sat;
    }
    return this.state.meetingDate.sat;
  }
  private toggleSun(checkBoxValue: string): boolean {
    if (checkBoxValue === 'sun') {
      return !this.state.meetingDate.sun;
    }
    return this.state.meetingDate.sun;
  }

  private classesFound(classes: any): void {
    this.allResults = [];
    if (this.emptyClasses(classes)) {
      this.updateStatesAfterProcessingClasses(true, false);
      return;
    }
    this.updateResults(classes);
  }

  private updateResults(classes: any): void {
    if (classes !== null && classes.length !== 0) {
      classes = Class.splitClassesWithMultipleMeetingTimes(classes);
      classes.forEach((_class: any) => {
        this.allResults.push(Class.transformToClass(_class));
      });
    }

    this.sortClasses();
    this.processCourseAttributes();
    this.allResults = FilterClasses.filter(this.allResults, this.state);
    this.updateStatesAfterProcessingClasses(false, false);
    this.resultsSection.current.scrollIntoView();
  }

  private sortClasses(): void {
    this.allResults = ClassSearchUtils.sortClasses(this.allResults);
  }

  private processCourseAttributes(): void {
    this.allResults = ClassSearchUtils.parseCourseAttributes(this.allResults, this.geClassesAttributes);
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
    if (this.isSubjectEmpty() && this.otherFieldsDoNotHaveValidValues()) {
      this.setState({
        showErrorMessage: true,
      });
      return this.displayErrorMessageWhenSubjectIsEmpty();
    }
    this.allResults = [];
    this.setState(
      {
        showErrorMessage: false,
        beforeSubmit: false,
        isLoading: true,
      },
      () => {
        this.updateAllClasses();
      }
    );
  }

  private onReset(): void {
    this.setState(this.setDefaultState());
    this.setState(
      {
        isReset: true,
      },
      () => {
        this.userInput = new UserInput();
      }
    );
  }

  private setDefaultState(): IClassSearchContainerState {
    return {
      term: this.currentTermId,
      campus: 'both',
      subject: {
        name: '',
        abbr: '',
      },
      courseNo: '',
      startTime: new Date('1899/01/01 00:00:00'),
      endTime: new Date('1899/01/01 23:00:00'),
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
      showOpenClasses: false,
      careerLevelOptions: {
        ugrd: false,
        pbac: false,
        exed: false,
      },
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
      this.setState({ forceReload: true });
    }
  }

  private subjectsFound(data: any): void {
    this.allSubjects = data.abbreviationTermList;
    this.subjects = Subject.getDropdownOptions(data.abbreviationTermList, this.state.term);
    this.setState({ forceReload: true });
  }

  private termFound(data: any): void {
    const terms = data.termList;
    const termArr: IOptionProps[] = [];
    terms.forEach((_term: any) => {
      if (this.hasCurrentQuarterFlag(_term)) {
        this.currentTermId = _term.strm;
        app.state.currentTerm = _term.strm;
      }
      termArr.push({
        label: _term.display_STR,
        value: _term.strm,
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
    return quarter.displayed_FLAG === 'Y' && quarter.default_FLG === 'Y';
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
    return this.state.isReset && this.state.beforeSubmit && this.state.subject.abbr.length === 0;
  }

  private isSubjectEmpty(): boolean {
    return this.state.subject.abbr.length === 0;
  }

  private isInstructorEmpty(): boolean {
    return this.state.instructorName === '';
  }

  private isCourseNumberEmpty(): boolean {
    return this.state.courseNo === '';
  }

  private isMeetingDayEmpty(): boolean {
    return (
      !this.state.meetingDate.mon &&
      !this.state.meetingDate.tue &&
      !this.state.meetingDate.wed &&
      !this.state.meetingDate.thu &&
      !this.state.meetingDate.fri &&
      !this.state.meetingDate.sat &&
      !this.state.meetingDate.sun
    );
  }

  private isClassNoEmpty(): boolean {
    return this.state.classNo === '';
  }

  private isValidInstructionModeSelected(): boolean {
    return this.state.instructionMode === 'all';
  }

  private bothCampusSelected(): boolean {
    return this.state.campus === 'both';
  }

  private allGeAttributesSelected(): boolean {
    return this.state.geClassesAttribute.length === 0;
  }

  private allCourseAttributesSelected(): boolean {
    return this.state.courseAttr === 'all';
  }

  private otherFieldsDoNotHaveValidValues(): boolean {
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
    if (!this.isValidInstructionModeSelected()) {
      return false;
    }
    if (!this.bothCampusSelected()) {
      return false;
    }
    if (!this.allGeAttributesSelected()) {
      return false;
    }
    if (!this.allCourseAttributesSelected()) {
      return false;
    }
    return true;
  }

  private displayErrorMessageWhenSubjectIsEmpty(): JSX.Element {
    return (
      <Callout className="subject-validation" intent={Intent.WARNING}>
        Please select a Course Subject
      </Callout>
    );
  }

  private hasNoClasses(): boolean {
    return this.isPageLoad() || this.state.noClasses;
  }

  private isPageLoad(): boolean {
    return !this.state.noClasses && this.allResults.length === 0;
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
        onChangeOfOpenClasses={this.updateOpenClasses}
        onChangeOfCareerLevelOptions={this.updateCareerLevelOptions}
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
        openClasses={this.state.showOpenClasses}
        careerLevelOptions={this.state.careerLevelOptions}
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
    this.userInput.setCourseAttr('');
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
    const value = e.target.value;
    this.setState({
      geClassesAttribute: value,
    });
    if (value.length === 0) {
      this.userInput.setCourseAttr('');
    }
    this.userInput.setGeClassesAttr(value);
    if (parseInt(this.state.term, 10) >= app.settings.firstSemester) {
      this.userInput.setCourseAttr('');
      this.userInput.setGeClassesAttr('');
    }
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
    return degreeAbbr === 'UGRD' || degreeAbbr === 'PBAC' || degreeAbbr === 'EXED';
  }

  private geClassesAttributesFound(data: any): void {
    const geClassesQuarter = data.classAttributeQList;
    const geClassesSem = data.classAttributeSList;
    geClassesQuarter.forEach((attribute: any) => {
      if (attribute.crse_ATTR === 'GE') {
        this.geClassesAttributes.push({
          label: attribute.descr,
          value: attribute.descr.split(' ')[0],
        });
      }
    });
    geClassesSem.forEach((attribute: any) => {
      if (attribute.crse_ATTR === 'GE') {
        this.geClassesAttributes.push({
          label: attribute.descr,
          value: GeCourseAttribute.normalizeCourseDescription(attribute.descr),
        });
      }
    });
    this.setState({
      forceReload: true,
    });
  }

  private updateSubjectDropdown(term: string): void {
    this.subjects = Subject.getDropdownOptions(this.allSubjects, term);
  }

  private updateStatesAfterProcessingClasses(noClassesStatus: boolean, isLoadingStatus: boolean): void {
    this.setState({
      noClasses: noClassesStatus,
      isLoading: isLoadingStatus,
    });
  }

  private emptyClasses(classes: any): boolean {
    return classes === null || classes.length === 0;
  }

  private updateOpenClasses(_event: any): void {
    this.setState(
      {
        showOpenClasses: !this.state.showOpenClasses,
      },
      () => {
        this.userInput.setOpenClassesStatus(this.state.showOpenClasses);
      }
    );
  }

  private updateCareerLevelOptions(event: any): void {
    const checkBoxValue = event.target.value;
    this.setState(
      {
        careerLevelOptions: {
          ugrd: checkBoxValue === 'ugrd' ? !this.state.careerLevelOptions.ugrd : this.state.careerLevelOptions.ugrd,
          pbac: checkBoxValue === 'pbac' ? !this.state.careerLevelOptions.pbac : this.state.careerLevelOptions.pbac,
          exed: checkBoxValue === 'exed' ? !this.state.careerLevelOptions.exed : this.state.careerLevelOptions.exed,
        },
      },
      () => {
        this.userInput.setCareerLevelOptionsStatus(this.state.careerLevelOptions);
      }
    );
  }
}
