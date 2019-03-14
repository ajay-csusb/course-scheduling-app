import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, Class, IMeetingTime, IMeetingDate } from './Class';
import * as ClassSearchUtils from './ClassSearchUtils';
import { Instructor } from './Instructor';
import { Subject, ISubject } from './Subject';

interface IClassSearchContainerState {
  updateAllResults: boolean;
  quarter: string;
  campus: string;
  subject: ISubject;
  meetingTime: IMeetingTime;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  isReset: boolean;
  isLoading: boolean;
  beforeSubmit: boolean;
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
    this.updateMeetingTime = this.updateMeetingTime.bind(this);
    this.updateMeetingDate = this.updateMeetingDate.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
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
    return (
      <div>
        <ClassSearchForm
          classes={this.allResults}
          quarter={this.state.quarter}
          campus={this.state.campus}
          subjects={this.subjects}
          meetingTime={this.state.meetingTime}
          meetingDate={this.state.meetingDate}
          instructionMode={this.state.instructionMode}
          instructorName={this.state.instructorName}
          instructors={this.instructors}
          onChangeOfQuarter={this.updateQuarter}
          onChangeOfCampus={this.updateCampus}
          onChangeOfMeetingTime={this.updateMeetingTime}
          onChangeOfMeetingDate={this.updateMeetingDate}
          onChangeOfSubject={this.updateSubject}
          onChangeOfInstructionMode={this.updateInstructionMode}
          onChangeOfInstructor={this.updateInstructorName}
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        />
        {!this.state.beforeSubmit &&
          <ClassSearchResults
            classes={this.allResults}
            quarter={this.state.quarter}
            subject={this.state.subject}
            campus={this.state.campus}
            meetingTime={this.state.meetingTime}
            meetingDate={this.state.meetingDate}
            instructionMode={this.state.instructionMode}
            instructorName={this.state.instructorName}
          />
        }
      </div>
    );
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    Class.getAllClasses(this.classesFound, this.classesNotFound);
    Subject.getAllSubjects(this.subjectsFound, this.subjectsNotFound);
    Instructor.getAllInstructors(this.instructorsFound, this.instructorsNotFound);
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

  private updateMeetingTime(e: any): void {
    const checkBoxValue = e.target.value;
    this.setState({
      meetingTime: {
        all: this.toggleAll(checkBoxValue),
        beforeNoon: this.toggleBeforeNoon(checkBoxValue),
        afterNoon: this.toggleAfterNoon(checkBoxValue),
        evening: this.toggleEvening(checkBoxValue),
      },
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

  private toggleAll(checkBoxValue: string): boolean {
    if (checkBoxValue === 'all') {
      if (this.state.meetingTime.all) {
        return false;
      }
      return true;
    }
    return false;
  }

  private toggleBeforeNoon(checkBoxValue: string): boolean {
    if (checkBoxValue === 'before-noon') {
      if (this.state.meetingTime.beforeNoon) {
        return false;
      }
      return true;
    }
    return this.state.meetingTime.beforeNoon;
  }

  private toggleAfterNoon(checkBoxValue: string): boolean {
    if (checkBoxValue === 'after-noon') {
      if (this.state.meetingTime.afterNoon) {
        return false;
      }
      return true;
    }
    return this.state.meetingTime.afterNoon;
  }
  private toggleEvening(checkBoxValue: string): boolean {
    if (checkBoxValue === 'evening') {
      if (this.state.meetingTime.evening) {
        return false;
      }
      return true;
    }
    return this.state.meetingTime.evening;
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
    if (ClassSearchUtils.isObjectEmpty(data)) {
      return;
    }
    data.forEach((_data: any) => {
      transformedClass.push(Class.transformToClass(_data));
    });
    this.allResults = transformedClass;
    this.setState({
      isLoading: false,
    });
  }

  private classesNotFound(error: string): void {
    console.log(error);
  }

  private onSubmit(_e: any): void {
    this.setState({
      beforeSubmit: false,
    });
  }

  private onReset(_e: any): void {
    this.setState(this.defaultFromValues());
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
      meetingTime: {
        all: true,
        beforeNoon: false,
        afterNoon: false,
        evening: false,
      },
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
      isReset: false,
      isLoading: false,
      beforeSubmit: true,
    };
  }

  private instructorsFound(data: any): void {
    if (data !== undefined) {
      this.instructors = data;
    }
  }

  private instructorsNotFound(error: string): void {
    console.log(error);
  }

  private subjectsFound(data: any): void {
    const subjects: ISubject[] = [];
    if (data !== undefined) {
      data.forEach((_subject: any) => {
        const subject: ISubject = {
          name: '',
          abbr: '',
        };
        subject.abbr = _subject.subject;
        subject.name = _subject.subject_DESC;
        subjects.push(subject);
      });
      this.subjects = subjects;
    }
  }

  private subjectsNotFound(error: string): void {
    console.log(error);
  }
}
