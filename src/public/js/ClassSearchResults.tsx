import * as React from 'react';
import { IClass, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { FilterClasses } from './FilterClasses';
import { UserInput } from './UserInput';
import { ClassesCards } from './ClassesCards';
export interface IClassSearchResultsProps {
  classes: IClass[];
  quarter: string;
  campus: string;
  subject: ISubject;
  courseNo: string;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  geClasses: boolean;
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
  isLoading: boolean;
  onChangeOfLoadingMessage: () => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    const rows: any = [];
    let filteredResults: IClass[] = this.props.classes;
    let counter = 0;
    const userInput = new UserInput(
      this.props.campus, this.props.meetingDate, this.props.subject, this.props.courseNo, this.props.quarter,
      this.props.startTime, this.props.endTime, this.props.instructionMode, this.props.instructorName,
      this.props.geClasses);
    if (this.props.classes.length !== 0) {
      filteredResults = FilterClasses.filter(this.props.classes, userInput);
      filteredResults.forEach((_class: IClass) => {
        counter++;
        rows.push(
          <li key={_class.classNumber}>
            <ClassesCards classes={_class} />
            <br />
          </li>
        );
      });
    }
    if (counter === filteredResults.length) {
      this.props.onChangeOfLoadingMessage();
    }
    return (
      <div id="class-search-results-component">
        <p>Found {counter} classes</p>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }

}
