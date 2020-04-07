import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Popover, Classes } from '@blueprintjs/core';
import { Utils } from './Utils';

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
    const roomNumberMarkup = this.getRoomNumberMarkup();
    const instructionMode = ClassSearchUtils.getInstructionMode(this.classDetails);
    const textBookMarkup = this.getTextBookMarkup();
    const instructorMarkup = this.getInstructorMarkup();
    const sessionMarkup = this.getSessionMarkup();
    let courseAttrMarkup = null;
    if (this.classDetails.courseAttr.length !== 0) {
      courseAttrMarkup = <li><span>Course Attribute </span>{this.classDetails.courseAttr}</li>;
    }
    const courseMaterialIconMarkup = this.getCourseMaterialIconMarkup();
    return (
      <React.Fragment>
        <ul className="course-desc">
          <li><span>Units </span>{this.classDetails.csuUnits}</li>
          <li><span>Meeting Time </span>{time}</li>
          <li><span>Meeting Days </span>{days}</li>
          {roomNumberMarkup}
          <li><span>Campus </span>{campus}</li>
          <li>{instructorMarkup}</li>
          <li><span>Instruction Mode </span>{instructionMode}</li>
          {courseAttrMarkup}
          {sessionMarkup}
        </ul>
        <div className="course-books">
          {textBookMarkup}
          {courseMaterialIconMarkup}
        </div>

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
    const topicLowercase = this.classDetails.topic.toLowerCase();
    const topic = (topicLowercase.trim().length !== 0) ? `: ${Utils.toCapitalizeCase(topicLowercase)}` : '';
    const tooltip = this.getTooltipMarkup();
    return (
      <div className="course-name">
        <strong>
          {`${this.classDetails.subject} ${this.classDetails.catalogNo}`}
          {` - ${this.classDetails.title}${topic}`}
        </strong>
        <Popover
          content={this.classDetails.longDescription}
          position={'auto'}
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        >
          {tooltip}
        </Popover>
      </div >
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
    return (this.props.currentTerm === this.classDetails.quarter) || parseInt(this.classDetails.quarter, 10) >= 2204;
  }

  public getClassStatusMarkup(): JSX.Element {
    let classStatus = 'Closed';
    let classStatusClassName = 'course-status course-status--closed';
    if (this.isCurrentTerm()) {
      classStatus = ClassSearchUtils.getClassStatus(this.classDetails);
      if (classStatus === 'Open') {
        classStatusClassName = 'course-status course-status--open';
      }
    }
    return (
      <React.Fragment>
        <div className={classStatusClassName}><span />{classStatus}</div>
      </React.Fragment>
    );
  }

  public getClassAvailabilityMarkup(): JSX.Element {
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(this.classDetails);
    const waitlistMarkup = <div>{this.getWaitlistMarkup()}</div>;
    if (!this.isCurrentTerm()) {
      return (<React.Fragment/>);
    }
    if (ClassSearchUtils.getClassStatus(this.classDetails) === 'Closed') {
      // @Todo add markup to shows seats available
      return (<>{waitlistMarkup}</>);
    }
    if (ClassSearchUtils.isWaitlist(this.classDetails)) {
      return (<>{waitlistMarkup}</>);
    }
    return (
      <div className="course-availability">
      Seats Available: <span>{noOfSeatsAvailable}/{this.classDetails.enrolledCapacity}</span>
      </div>
    );
  }

  public getWaitlistMarkup(): JSX.Element {
    const waitlistNo = this.classDetails.waitlistTotal;
    if (!this.isCurrentTerm()) {
      return (<React.Fragment/>);
    }
    // @Todo delete this
    if (this.classDetails.waitlistCapacity === 0) {
      return (<div className="course-availability">No Waitlist</div>);
    }
    return (
      <div className="course-availability">
      Waitlist: <span>{waitlistNo}/{this.classDetails.waitlistCapacity}</span>
      </div>
    );
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

  public isNonRegularSession(): boolean {
    const sessionCodes = [
      '10W',
      '6W1',
      '6W2',
      '3W1',
    ];
    return (sessionCodes.includes(this.classDetails.sessionCode.trim()));
  }

  public getSessionMarkup(): JSX.Element {
    if (this.isNonRegularSession()) {
      const session = ClassSearchUtils.getSessionCode(this.classDetails);
      return (<><li><span>Session </span>{session}</li></>);
    }
    return <></>;
  }

  public getRoomNumberMarkup(): JSX.Element {
    const roomNumber = ClassSearchUtils.getRoomNumber(this.classDetails);
    if (this.classDetails.instructionMode !== 'FO') {
      return (<li><span>Room </span>{roomNumber}</li>);
    }
    return <></>;
  }

  public getCourseMaterialIconMarkup(): JSX.Element {
    let zeroCostIcon = null;
    let lowCostIcon = null;
    const courseAttrArr = this.classDetails.courseAttr.split(', ').map(_ele => _ele.trim());
    if (courseAttrArr.includes('Zero Cost Course Materials')) {
      zeroCostIcon = (
        <img
          src="https://www.csusb.edu/sites/default/files/zero-cost-book-icon-big.png"
          alt="Zero Cost Course Materials"
        />
      );
    }
    if (courseAttrArr.includes('Low Cost Course Materials')) {
      lowCostIcon = (
        <img
          src="https://www.csusb.edu/sites/default/files/low-cost-book-icon-big.png"
          alt="Low Cost Course Materials"
        />
      );
    }
    if (!zeroCostIcon && !lowCostIcon) {
      return <></>;
    }
    return (<div className="course--icons">{zeroCostIcon}{lowCostIcon}</div>);
  }

}
