import * as React from 'react';
import { IClass, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { FilterClasses } from './FilterClasses';
import { UserInput } from './UserInput';
import { ClassesCards } from './ClassesCards';
interface IClassSearchResultsProps {
  classes?: IClass[];
  quarter: string;
  campus: string;
  subject: ISubject;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
}

interface IClassSearchResultsState {
  refreshTable: boolean;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, IClassSearchResultsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      refreshTable: false,
    };
  }
  componentDidUpdate(prevProps: IClassSearchResultsProps) {
    if (this.props.classes !== prevProps.classes) {
      this.setState({
        refreshTable: true,
      });
    }
  }

  public render(): JSX.Element {
    const rows: any = [];
    let filteredResults: IClass[] = [];
    const userInput = new UserInput(
      this.props.campus, this.props.meetingDate, this.props.subject, this.props.quarter,
      this.props.startTime, this.props.endTime, this.props.instructionMode, this.props.instructorName);
    if (this.props.classes) {
      filteredResults = FilterClasses.filter(this.props.classes, userInput);
      filteredResults.forEach((_class: any) => {
        if (rows.length > 300) {
          return;
        }
        rows.push(
          <ClassesCards
            classes={_class}
            key={_class.classNumber}
          />
        );
      });
    }
    if (rows.length === 0) {
      return <p>No classes found</p>;
    }
    return (
      <div id="class-search-results-component">
        {rows}
      </div>
    );
  }

}
