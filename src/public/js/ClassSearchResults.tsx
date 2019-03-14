import * as React from 'react';
import { IClass, IMeetingTime, IMeetingDate } from './Class';
import { ISubject } from './Subject';
import { FilterClasses } from './FilterClasses';
import { UserInput } from './UserInput';
import { ClassesRow } from './ClassesRow';
interface IClassSearchResultsProps {
  classes?: IClass[];
  quarter: string;
  campus: string;
  subject: ISubject;
  meetingTime: IMeetingTime;
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  isReset?: boolean;
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
      this.props.meetingTime, this.props.instructionMode, this.props.instructorName);
    if (this.props.classes) {
      filteredResults = FilterClasses.filter(this.props.classes, userInput);
      filteredResults.forEach((_class: any) => {
        if (rows.length > 300) {
          return;
        }
        rows.push(
          <ClassesRow
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
        <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-interactive bp3-small">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class No.</th>
              <th>Session</th>
              <th>Title</th>
              <th>Instruction Mode</th>
              <th>Units</th>
              <th>Days</th>
              <th>Bldg/Room</th>
              <th>Instructor</th>
              <th>Available Seats/Enrolled/Max-Enroll</th>
              <th>Type/Group</th>
              <th>Campus</th>
              <th>Lab/Activity Fee</th>
              <th>Textbook</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

}
