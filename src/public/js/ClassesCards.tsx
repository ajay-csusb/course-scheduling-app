import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Popover, Position, Classes } from '@blueprintjs/core';

interface IClassesCardsProps {
  classes: IClass;
  currentTerm: string;
}

export class ClassesCards extends React.Component<IClassesCardsProps> {
  readonly searchURL = 'https://search.csusb.edu';
  private classDetails: IClass;

  public constructor(props: IClassesCardsProps) {
    super(props);
    this.classDetails = this.props.classes;
  }

  public render(): JSX.Element {
    // @Todo add degree type and Session code
    const courseHeaderMarkup = this.getCourseHeaderMarkup();
    const courseBodyMarkup = this.getCourseBodyMarkup();
    const courseInfoMarkup = this.getCourseInfoMarkup();
    return (
      <div className="course result-item">
        <div className="item-header">
          {courseHeaderMarkup}
          {courseInfoMarkup}
        </div>
        <div className="item-body">
          {courseBodyMarkup}
        </div>
      </div>
    );
  }
  public getCourseBodyMarkup(): JSX.Element {
    const classObj = new Class(this.classDetails);
    const campus = ClassSearchUtils.getCampusName(this.classDetails.campus);
    const days = classObj.getClassMeetingDates();
    const time = classObj.getClassMeetingTimes();
    const roomNumber = ClassSearchUtils.getRoomNumber(this.classDetails);
    const instructionMode = ClassSearchUtils.getInstructionMode(this.classDetails);
    const textBookMarkup = this.getTextBookMarkup();
    const instructorMarkup = this.getInstructorMarkup();
    return (
      <React.Fragment>
        <ul className="course-desc">
          <li><span>Units </span>{this.classDetails.csuUnits}</li>
          <li><span>Meeting Time </span>{time}</li>
          <li><span>Meeting Days </span>{days}</li>
          <li><span>Room </span>{roomNumber}</li>
          <li><span>Campus </span>{campus}</li>
          <li>{instructorMarkup}</li>
          <li><span>Instruction Mode </span>{instructionMode}</li>
          <li><span>Course Attribute </span>{this.classDetails.courseAttr}</li>
        </ul>
        {textBookMarkup}
      </React.Fragment>
    );
  }

  public getCourseInfoMarkup(): JSX.Element {
    const classStatus = this.getClassStatusMarkup();
    const classAvailability = this.getClassAvailabilityMarkup();
    return (
      <div className="course-info">
        {classStatus}
        {classAvailability}
      </div>
    );
  }

  public getTextBookMarkup(): JSX.Element {
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: this.classDetails.textbook }} />
      </React.Fragment>
    );
  }

  public getInstructorMarkup(): JSX.Element {
    const instructorName = ClassSearchUtils.getInstructorName(this.classDetails);
    const instructorProfileURL = this.searchURL + this.classDetails.profile;
    let instructor = <React.Fragment><span>Instructor</span> N/A</React.Fragment>;
    if (instructorName !== 'N/A') {
      instructor = (
        <React.Fragment>
          <span>Instructor</span><a href={instructorProfileURL}>{instructorName}</a>
        </React.Fragment>
      );
    }
    return instructor;
  }

  public getClassDescription(): JSX.Element {
    return (
      <Popover
        content={this.classDetails.longDescription}
        position={Position.RIGHT}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        <div className="course-name">
          <div className={Classes.TOOLTIP_INDICATOR}>
            <strong>{`${this.classDetails.subject} ${this.classDetails.catalogNo}`}</strong> {`- ${this.classDetails.description}`}
          </div>
        </div>
      </Popover>
    );
  }

  public getCourseHeaderMarkup(): JSX.Element {
    const classType = ClassSearchUtils.getClassType(this.classDetails);
    const classDescription = this.getClassDescription();
    return (
      <div className="course-header">
          {classDescription}
          <div className="course-details">
              <span>Section {this.classDetails.classSection} • </span>
              <span>{classType} • </span>
              <span className="course-id">Class No. {this.classDetails.classNumber}</span>
          </div>
      </div>
    );
  }

  public isCurrentTerm(): boolean {
    return (this.props.currentTerm === this.classDetails.quarter);
  }

  public getClassStatusMarkup(): JSX.Element {
    let classStatus = 'Closed';
    let classStatusClassName = 'course-status course-status--closed';
    let waitlistMarkup = this.getWaitlistMarkup();
    if (this.isCurrentTerm()) {
      classStatus = ClassSearchUtils.getClassStatus(this.classDetails);
      if (classStatus === 'Open') {
        classStatusClassName = 'course-status course-status--open';
        waitlistMarkup = <div />;
      }
    }
    return (
      <div className={classStatusClassName}><span />{classStatus} {waitlistMarkup}</div>
    );
  }

  public getClassAvailabilityMarkup(): JSX.Element {
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(this.classDetails);
    if (ClassSearchUtils.getClassStatus(this.classDetails) === 'Closed') {
      return (<div />);
    }
    if (!this.isCurrentTerm()) {
      return (<div />);
    }
    return (
      <div className="course-availability">Available Seats <span>{noOfSeatsAvailable}</span></div>
    );
  }

  public getWaitlistMarkup(): JSX.Element {
    const waitlistNo = this.classDetails.waitlistTotal;
    if (this.classDetails.waitlistCapacity === 0) {
      return (<React.Fragment><span>No Waitlist</span></React.Fragment>);
    }
    return (<React.Fragment><span>Waitlist: </span>{waitlistNo}</React.Fragment>);
  }

}
