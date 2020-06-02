import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Popover, Classes } from '@blueprintjs/core';

interface IClassesCardsProps {
  classes: IClass;
  currentTerm: string;
}

export class ClassesCards extends React.Component<IClassesCardsProps> {
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
      courseAttrMarkup = <li><span>Course Attribute </span>{this.sanitizeCourseAttributes(this.classDetails.courseAttr)}</li>;
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
    const textbookUrl = ClassSearchUtils.getTextbookUrl(this.classDetails);
    const {subject, catalogNo} = this.classDetails;
    return (
      <a className="btn btn-white btn-solid" href={textbookUrl} target="_blank">
        <span className="sr-only">{subject} {catalogNo}</span>
        Textbook
      </a>
    );
  }

  public getInstructorMarkup(): JSX.Element {
    let instructor = <><span>Instructor</span> TBD</>;
    if (ClassSearchUtils.getInstructorMarkup(this.classDetails)) {
      const instructorProfile = ClassSearchUtils.getInstructorMarkup(this.classDetails);
      instructor = (<><span>Instructor</span>{instructorProfile}</>);
    }
    return instructor;
  }

  public getClassFullTitle(): JSX.Element {
    const topic = ClassSearchUtils.formatSubjectTopic(this.classDetails.topic);
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
    const title = this.getClassFullTitle();
    return (
      <div className="course-header">
          {title}
          <div className="course-details">
              <span>Section {this.classDetails.classSection} • </span>
              {this.getClassTypeMarkup()}
              <span className="course-id">Class No. {this.classDetails.classNumber}</span>
          </div>
      </div>
    );
  }

  public getClassStatusMarkup(): JSX.Element {
    let classStatus = 'Closed';
    let classStatusClassName = 'course-status course-status--closed';
    if (this.isValidTerm(this.classDetails.quarter)) {
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
    if (!this.isValidTerm(this.classDetails.quarter)) {
      return (<React.Fragment/>);
    }
    if (ClassSearchUtils.isWaitlist(this.classDetails) || ClassSearchUtils.getClassStatus(this.classDetails) === 'Closed') {
      return (
        <div className="course-availability-wrap">
          <div className="course-availability">
            Seats available: <span>{noOfSeatsAvailable} / {this.classDetails.enrolledCapacity}</span>
          </div>
        {waitlistMarkup}
        </div>
      );
    }
    return (
      <div className="course-availability">
        Seats available: <span>{noOfSeatsAvailable} / {this.classDetails.enrolledCapacity}</span>
      </div>
    );
  }

  public getWaitlistMarkup(): JSX.Element {
    const waitlistCapacity = this.classDetails.waitlistCapacity;
    const numberOfSeatsInWaitlist = this.classDetails.waitlistCapacity -  this.classDetails.waitlistTotal;
    if (!this.isValidTerm(this.classDetails.quarter)) {
      return (<React.Fragment/>);
    }
    if (this.classDetails.waitlistCapacity === 0) {
      return (<div className="course-availability">No Waitlist</div>);
    }
    return (
      <div className="course-availability">
        Waitlist spots available: <span>{numberOfSeatsInWaitlist} / {waitlistCapacity}</span>
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
  public getClassTypeMarkup(): JSX.Element {
    let classType: JSX.Element = <></>;
    if (this.classDetails.fullSsrComponent) {
      classType = (<span>{this.classDetails.fullSsrComponent} • </span>);
    }
    return classType;
  }

  private isValidTerm(quarter: string): boolean {
    const CurrMonth = new Date().getMonth() + 1;
    return (ClassSearchUtils.isValidTermRange(this.props.currentTerm, quarter, CurrMonth) === true);
  }

  private sanitizeCourseAttributes(courseAttributes: string) {
    let result = courseAttributes;
    while (result.trim().startsWith(', ')) {
      // remove all ocuurances of ', ' from the start of the string
      result = result.slice(2);
    }
    return result.replace(' , ', ' ');
  }

}
