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

  public render(): JSX.Element {
    const classDetails: IClass = this.props.classes;
    // @Todo add degree type and Session code
    const courseHeaderMarkup = this.getCourseHeaderMarkup(classDetails);
    const courseBodyMarkup = this.getCourseBodyMarkup(classDetails);
    const courseInfoMarkup = this.getCourseInfoMarkup(classDetails);
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
  public getCourseBodyMarkup(classDetails: any): JSX.Element {
    const classObj = new Class(classDetails);
    const campus = ClassSearchUtils.getCampusName(classDetails.campus);
    const days = classObj.getClassMeetingDates();
    const time = classObj.getClassMeetingTimes();
    const roomNumber = ClassSearchUtils.getRoomNumber(classDetails);
    const instructionMode = ClassSearchUtils.getInstructionMode(classDetails);
    const textBookMarkup = this.getTextBookMarkup(classDetails);
    const instructorMarkup = this.getInstructorMarkup(classDetails);
    return (
      <React.Fragment>
        <ul className="course-desc">
          <li><span>Units </span>{classDetails.csuUnits}</li>
          <li><span>Meeting Time </span>{time}</li>
          <li><span>Meeting Days </span>{days}</li>
          <li><span>Room </span>{roomNumber}</li>
          <li><span>Campus </span>{campus}</li>
          <li>{instructorMarkup}</li>
          <li><span>Instruction Mode </span>{instructionMode}</li>
          <li><span>Course Attribute </span>{classDetails.courseAttr}</li>
        </ul>
        {textBookMarkup}
      </React.Fragment>
    );
  }

  public getCourseInfoMarkup(classDetails: any): JSX.Element {
    const classStatus = this.getClassStatusMarkup(classDetails);
    const classAvailability = this.getClassAvailabilityMarkup(classDetails);
    return (
      <div className="course-info">
        {classStatus}
        {classAvailability}
      </div>
    );
  }

  public getTextBookMarkup(classDetails: any): JSX.Element {
    return (
      <React.Fragment>
        <span className="fas fa-book" dangerouslySetInnerHTML={{ __html: classDetails.textbook }} />
        <span className="sr-only">
          for {`${classDetails.subject} ${classDetails.catalogNo}`}, Section {classDetails.classSection}
        </span>
      </React.Fragment>
    );
  }

  public getInstructorMarkup(classDetails: any): JSX.Element {
    const instructorName = ClassSearchUtils.getInstructorName(classDetails);
    const instructorProfileURL = this.searchURL + classDetails.profile;
    let instructor = <span>Instructor N/A</span>;
    if (instructorName !== 'N/A') {
      instructor = <span>Instructor <a href={instructorProfileURL}> {instructorName}</a></span>;
    }
    return instructor;
  }

  public getCourseDetailsMarkup(classDetails: any): JSX.Element {
    const classType = ClassSearchUtils.getClassType(classDetails);
    const classDescription = this.getClassDescription(classDetails);
    return (
      <div className="course-title">
        <div className="course-details">
          <span>{`${classDetails.subject} ${classDetails.catalogNo}`}</span>
          <span>Section {classDetails.classSection}</span>
          <span>{classType}</span>
        </div>
        {classDescription}
      </div>
    );
  }

  public getClassDescription(classDetails: any): JSX.Element {
    return (
      <Popover
        content={classDetails.longDescription}
        position={Position.RIGHT}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        <div className="course-name"><span className={Classes.TOOLTIP_INDICATOR}>{classDetails.description}</span></div>
      </Popover>
    );
  }

  public getCourseHeaderMarkup(classDetails: any): JSX.Element {
    const courseDetailsMarkup = this.getCourseDetailsMarkup(classDetails);
    return (
      <div className="course-header">
          {courseDetailsMarkup}
        <div className="course-id">Class No. {classDetails.classNumber}</div>
      </div>
    );
  }

  public isCurrentTerm(classDetails: any): boolean {
    return (this.props.currentTerm === classDetails.quarter);
  }

  public getClassStatusMarkup(classDetails: any): JSX.Element {
    let classStatus = 'Closed';
    let classStatusClassName = 'course-status course-status--close';
    if (this.isCurrentTerm(classDetails)) {
      classStatus = ClassSearchUtils.getClassStatus(classDetails);
      if (classStatus === 'Open') {
        classStatusClassName = 'course-status course-status--open';
      }
    }
    return (
      <div className={classStatusClassName}><span />{classStatus}</div>
    );
  }

  public getClassAvailabilityMarkup(classDetails: any): JSX.Element {
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(classDetails);
    if (ClassSearchUtils.getClassStatus(classDetails) === 'Closed') {
      return (<div />);
    }
    if (!this.isCurrentTerm(classDetails)) {
      return (<div />);
    }
    return (
      <div className="course-availability">Available Seats <span>{noOfSeatsAvailable}</span></div>
    );
  }
}
