import * as React from 'react';
import { ClassSearchForm } from './ClassSearchForm';
import { ClassSearchResults } from './ClassSearchResults';
import { IClass, getAllClasses } from './Class';

export interface IMeetingTime {
  all: boolean;
  beforeNoon: boolean;

  afterNoon: boolean;

  evening: boolean;
}

export interface IMeetingDate {
  all: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

interface ClassSearchContainerState {
  updateAllResults: boolean;
  quarter: string;
  campus: string;
  courseId: string;
  meetingTime: IMeetingTime;
  meetingDate: IMeetingDate;
  isReset: boolean;
}
export class ClassSearchContainer extends React.Component<{}, ClassSearchContainerState> {

  private allResults: [];
  constructor(props: any) {
    super(props);
    this.state = {
      updateAllResults: false,
      quarter: 'current',
      campus: 'both',
      courseId: '',
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
      isReset: false,
    };
    this.onChangeOfQuarter = this.onChangeOfQuarter.bind(this);
    this.onChangeOfCampus = this.onChangeOfCampus.bind(this);
    this.onChangeOfMeetingTime = this.onChangeOfMeetingTime.bind(this);
    this.onChangeOfMeetingDate = this.onChangeOfMeetingDate.bind(this);
    this.onChangeOfClassName = this.onChangeOfClassName.bind(this);
    this.classesFound = this.classesFound.bind(this);
    this.classesNotFound = this.classesNotFound.bind(this);
    this.allResults = [];
  }

  public render(): JSX.Element {
    return (
      <div>
        <ClassSearchForm
          classes={this.allResults}
          quarter={this.state.quarter}
          campus={this.state.campus}
          courseId={this.state.courseId}
          meetingTime={this.state.meetingTime}
          meetingDate={this.state.meetingDate}
          onChangeOfQuarter={this.onChangeOfQuarter}
          onChangeOfCampus={this.onChangeOfCampus}
          onChangeOfMeetingTime={this.onChangeOfMeetingTime}
          onChangeOfMeetingDate={this.onChangeOfMeetingDate}
          onChangeOfClassName={this.onChangeOfClassName}
        />
        <ClassSearchResults
          classes={this.allResults}
          quarter={this.state.quarter}
          courseId={this.state.courseId}
          campus={this.state.campus}
          meetingTime={this.state.meetingTime}
          meetingDate={this.state.meetingDate}
        />
      </div>
    );
  }
  componentDidMount() {
    getAllClasses(this.classesFound, this.classesNotFound);
  }
  private onChangeOfQuarter(e: any): void {
    this.setState({
      quarter: e.target.value,
    });
  }

  private onChangeOfCampus(e: any): void {
    this.setState({
      campus: e.target.value,
    });
  }

  private onChangeOfMeetingTime(e: any): void {
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

  private onChangeOfMeetingDate(e: any): void {
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

  private onChangeOfClassName(classes: IClass): void {
    const classValue = classes.courseId;
    this.setState({
      courseId: classValue,
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
    this.allResults = data;
    this.setState({
      updateAllResults: true,
    });
  }

  private classesNotFound(error: string): void {
    throw error;
  }

}
