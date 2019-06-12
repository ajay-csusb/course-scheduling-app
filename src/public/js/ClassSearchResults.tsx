import * as React from 'react';
import { IClass, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { ClassesCards } from './ClassesCards';
export interface IClassSearchResultsProps {
  classes: IClass[];
  campus: string;
  subject: ISubject;
  courseNo: string;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
  isLoading: boolean;
  onChangeOfLoadingMessage: () => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, {}> {

  constructor(props: IClassSearchResultsProps) {
    super(props);
  }

  public render(): JSX.Element {
    const rows: any = [];
    let filteredResults: IClass[] = this.props.classes;
    let counter = 0;
    if (this.props.classes.length !== 0) {
      filteredResults = this.props.classes;
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
