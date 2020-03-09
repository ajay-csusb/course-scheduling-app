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
    let courseAttrMarkup = null;
    if (this.classDetails.courseAttr.length !== 0) {
      courseAttrMarkup = <li><span>Course Attribute </span>{this.classDetails.courseAttr}</li>;
    }
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
          {courseAttrMarkup}
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
    let instructor = <><span>Instructor</span> TBD</>;
    if (this.classDetails.instructorName.trim().length !== 0) {
      const instructorName = this.classDetails.instructorName;
      const instructorProfileURL = this.searchURL + this.classDetails.profile;
      let userProfile = <>{instructorName}</>;
      if (this.classDetails.profile !== undefined && this.classDetails.profile.length !== 0) {
        userProfile = <a target="_blank" href={instructorProfileURL}>{instructorName}</a>;
      }
      instructor = (
        <><span>Instructor</span>{userProfile}</>
      );
    }
    return instructor;
  }

  public getClassFullTitle(): JSX.Element {
    const topic = (this.classDetails.topic.trim().length !== 0) ? `: ${this.classDetails.topic.toLowerCase()}` : '';
    const tooltip = this.getTooltipMarkup();
    return (
      <Popover
        content={this.classDetails.longDescription}
        position={Position.RIGHT}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        <div className="course-name">
          <strong>
            {`${this.classDetails.subject} ${this.classDetails.catalogNo}`}
            {` - ${this.classDetails.title}${topic}`}
          </strong>
          {tooltip}
        </div>
      </Popover>
    );
  }

  public getCourseHeaderMarkup(): JSX.Element {
    const classType = ClassSearchUtils.getClassType(this.classDetails);
    const title = this.getClassFullTitle();
    return (
      <div className="course-header">
          {title}
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
    let waitlistMarkup = <div>{this.getWaitlistMarkup()}</div>;
    if (this.isCurrentTerm()) {
      classStatus = ClassSearchUtils.getClassStatus(this.classDetails);
      if (classStatus === 'Open') {
        classStatusClassName = 'course-status course-status--open';
        waitlistMarkup = <React.Fragment/>;
      }
    }
    return (
      <React.Fragment>
        <div className={classStatusClassName}><span />{classStatus}</div>
        {waitlistMarkup}
      </React.Fragment>
    );
  }

  public getClassAvailabilityMarkup(): JSX.Element {
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(this.classDetails);
    if (ClassSearchUtils.getClassStatus(this.classDetails) === 'Closed') {
      return (<React.Fragment/>);
    }
    if (!this.isCurrentTerm()) {
      return (<React.Fragment/>);
    }
    if (ClassSearchUtils.isWaitlist(this.classDetails)) {
      return (<React.Fragment />);
    }
    return (
      <div className="course-availability"><span>{noOfSeatsAvailable}</span> seats available</div>
    );
  }

  public getWaitlistMarkup(): JSX.Element {
    const waitlistNo = this.classDetails.waitlistTotal;
    if (!this.isCurrentTerm()) {
      return (<React.Fragment/>);
    }
    if (this.classDetails.waitlistCapacity === 0) {
      return (<div className="course-availability">No Waitlist</div>);
    }
    return (<div className="course-availability"><span>{waitlistNo}</span> students on waitlist</div>);
  }

  public getTooltipMarkup(): JSX.Element {
    return (
      <div className={Classes.TOOLTIP_INDICATOR}>
        <button className="course-info-btn">
          <i className="fas fa-info-circle" arial-label="hidden" />
          <span className="sr-only">{`${this.classDetails.subject} ${this.classDetails.catalogNo}`}</span>
        </button>
      </div>
    );
  }

}
