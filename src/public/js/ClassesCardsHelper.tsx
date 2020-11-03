import { IClass, Class } from './Class';
import React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { Popover, Classes } from '@blueprintjs/core';

let currClass: IClass;
let currentTerm: string;

export function getCourseHeaderMarkup(_class: IClass): JSX.Element {
  currClass = _class;
  const { classSection, classNumber } = currClass;
  const title = getClassFullTitle();
  const type = getClassTypeMarkup();
  const feeMarkup = getFeeMarkup();

  return (
    <div className="course-header">
      {title}
      <div className="course-details">
        <span>Section {classSection} • </span>
        {type}
        <span className="course-id">Class No. {classNumber}</span>
        {feeMarkup}
      </div>
    </div>
  );
}

function getClassFullTitle(): JSX.Element {
  const { topic, subject, catalogNo, title, longDescription } = currClass;
  const topicFormatted = ClassSearchUtils.formatSubjectTopic(topic);
  const tooltip = getTooltipMarkup();

  return (
    <div className="course-name">
      <strong>
        {`${subject} ${catalogNo}`}
        {` - ${title}${topicFormatted}`}
      </strong>
      <Popover content={longDescription} position={'auto'} popoverClassName={Classes.POPOVER_CONTENT_SIZING}>
        {tooltip}
      </Popover>
    </div>
  );
}

function getTooltipMarkup(): JSX.Element {
  const { subject, catalogNo } = currClass;

  return (
    <div className={Classes.TOOLTIP_INDICATOR}>
      <button className="course-info-btn">
        <i className="fas fa-info-circle" arial-label="hidden" />
        <span className="sr-only">{`${subject} ${catalogNo}`}</span>
      </button>
    </div>
  );
}

function getClassTypeMarkup(): JSX.Element {
  const { fullSsrComponent } = currClass;
  let classType: JSX.Element = <></>;

  if (fullSsrComponent) {
    classType = <span>{fullSsrComponent} • </span>;
  }

  return classType;
}

export function getCourseBodyMarkupForRepeatingClasses(classes: IClass[]): JSX.Element[] {
  const classesMarkup: JSX.Element[] = classes.map((_class: IClass) => {
    return <div key={_class.classStartTime + _class.classEndTime}>{getCourseBodyMarkup(_class)}</div>;
  });

  return classesMarkup;
}

export function getCourseBodyMarkup(_class: IClass): JSX.Element {
  currClass = _class;
  const classObj = new Class(currClass);
  const { campus, courseAttr, csuUnits } = currClass;
  const campusName = ClassSearchUtils.getCampusName(campus);
  const days = classObj.getClassMeetingDates();
  const time = classObj.getClassMeetingTimes();
  const roomNumberMarkup = getRoomNumberMarkup();
  const instructionMode = ClassSearchUtils.getInstructionMode(currClass);
  const instructorMarkup = getInstructorMarkup();
  const sessionMarkup = getSessionMarkup();
  let courseAttrMarkup = null;

  if (courseAttr.length !== 0) {
    courseAttrMarkup = (
      <li>
        {' '}
        <span>Course Attribute </span>
        {sanitizeCourseAttributes(courseAttr)}
      </li>
    );
  }

  return (
    <React.Fragment>
      <ul className="course-desc">
        <li>
          <span>Units </span>
          {csuUnits}
        </li>
        <li>
          <span>Meeting Time </span>
          {time}
        </li>
        <li>
          <span>Meeting Days </span>
          {days}
        </li>
        {roomNumberMarkup}
        <li>
          <span>Campus </span>
          {campusName}
        </li>
        <li>{instructorMarkup}</li>
        <li>
          <span>Instruction Mode </span>
          {instructionMode}
        </li>
        {courseAttrMarkup}
        {sessionMarkup}
      </ul>
    </React.Fragment>
  );
}

function getRoomNumberMarkup(): JSX.Element {
  const roomNumber = ClassSearchUtils.getRoomNumber(currClass);

  if (currClass.instructionMode !== 'FO') {
    return (
      <li>
        <span>Room </span>
        {roomNumber}
      </li>
    );
  }

  return <></>;
}

function getTextBookMarkup(): JSX.Element {
  const textbookUrl = ClassSearchUtils.getTextbookUrl(currClass);
  const { subject, catalogNo } = currClass;

  return (
    <a className="btn btn-white btn-solid" href={textbookUrl} target="_blank">
      <span className="sr-only">
        {subject} {catalogNo}
      </span>
      Textbook
    </a>
  );
}

function getInstructorMarkup(): JSX.Element {
  let instructor = (
    <>
      <span>Instructor</span> TBD
    </>
  );
  if (ClassSearchUtils.getInstructorMarkup(currClass)) {
    const instructorProfile = ClassSearchUtils.getInstructorMarkup(currClass);
    instructor = (
      <>
        <span>Instructor</span>
        {instructorProfile}
      </>
    );
  }

  return instructor;
}

function getSessionMarkup(): JSX.Element {
  if (isNonRegularSession()) {
    const session = ClassSearchUtils.getSessionCode(currClass);

    return (
      <>
        <li>
          <span>Session </span>
          {session}
        </li>
      </>
    );
  }

  return <></>;
}

function isNonRegularSession(): boolean {
  const sessionCodes = ['10W', '6W1', '6W2', '3W1'];
  return sessionCodes.includes(currClass.sessionCode.trim());
}

function getFeeMarkup(): JSX.Element {
  let markup: JSX.Element = <></>;
  const { fee, ssrComponent } = currClass;
  if (ssrComponent === 'CLN') {
    return markup;
  }
  if (fee !== '0.00' || fee.length === 0) {
    markup = (
      <>
        <span> • Fee </span> ${fee}
      </>
    );
  }

  return markup;
}

function sanitizeCourseAttributes(courseAttributes: string): string {
  let result = courseAttributes;

  while (result.trim().startsWith(', ')) {
    // remove all ocuurances of ', ' from the start of the string
    result = result.slice(2);
  }

  return result.replace(' , ', ' ');
}

function getCourseMaterialIconMarkup(): JSX.Element {
  let zeroCostIcon = null;
  let lowCostIcon = null;
  const courseAttrArr = currClass.courseAttr.split(', ').map(_ele => _ele.trim());

  if (courseAttrArr.includes('Zero Cost Course Materials')) {
    zeroCostIcon = (
      <img
        src="https://www.csusb.edu/sites/default/files/zero-cost-book-icon-big.png"
        alt="Zero Cost Course Materials"
        title="Zero Cost Course Materials"
      />
    );
  }

  if (courseAttrArr.includes('Low Cost Course Materials')) {
    lowCostIcon = (
      <img
        src="https://www.csusb.edu/sites/default/files/low-cost-book-icon-big.png"
        alt="Low Cost Course Materials"
        title="Low Cost Course Materials"
      />
    );
  }

  if (!zeroCostIcon && !lowCostIcon) {
    return <></>;
  }

  return (
    <div className="course--icons">
      {zeroCostIcon}
      {lowCostIcon}
    </div>
  );
}

export function getCourseFooterMarkup(classes: IClass): JSX.Element {
  currClass = classes;
  const textBookMarkup = getTextBookMarkup();
  const courseMaterialIconMarkup = getCourseMaterialIconMarkup();

  return (
    <div className="course-books">
      {textBookMarkup}
      {courseMaterialIconMarkup}
    </div>
  );
}

export function getCourseInfoMarkup(_class: IClass, term: string): JSX.Element {
  currClass = _class;
  currentTerm = term;
  const classStatus = getClassStatusMarkup();
  const classAvailability = getClassAvailabilityMarkup();

  return (
    <div className="course-info">
      {classStatus}
      {classAvailability}
    </div>
  );
}

function getClassStatusMarkup(): JSX.Element {
  let classStatus = 'Closed';
  let classStatusClassName = 'course-status course-status--closed';

  if (isValidTerm(currClass.quarter)) {
    classStatus = ClassSearchUtils.getClassStatus(currClass);
    if (classStatus === 'Open') {
      classStatusClassName = 'course-status course-status--open';
    }
  }

  return (
    <React.Fragment>
      <div className={classStatusClassName}>
        <span />
        {classStatus}
      </div>
    </React.Fragment>
  );
}

function getClassAvailabilityMarkup(): JSX.Element {
  const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(currClass);
  const waitlistMarkup = <div>{getWaitlistMarkup()}</div>;

  if (!isValidTerm(currClass.quarter)) {
    return <React.Fragment />;
  }

  if (ClassSearchUtils.isWaitlist(currClass) || ClassSearchUtils.getClassStatus(currClass) === 'Closed') {
    return (
      <div className="course-availability-wrap">
        <div className="course-availability">
          Seats available:{' '}
          <span>
            {noOfSeatsAvailable} / {currClass.enrolledCapacity}
          </span>
        </div>
        {waitlistMarkup}
      </div>
    );
  }

  return (
    <div className="course-availability">
      Seats available:{' '}
      <span>
        {noOfSeatsAvailable} / {currClass.enrolledCapacity}
      </span>
    </div>
  );
}

function getWaitlistMarkup(): JSX.Element {
  const waitlistCapacity = currClass.waitlistCapacity;
  const numberOfSeatsInWaitlist = currClass.waitlistCapacity - currClass.waitlistTotal;

  if (!isValidTerm(currClass.quarter)) {
    return <React.Fragment />;
  }

  if (currClass.waitlistCapacity === 0) {
    return <div className="course-availability">No Waitlist</div>;
  }

  return (
    <div className="course-availability">
      Waitlist spots available:{' '}
      <span>
        {numberOfSeatsInWaitlist} / {waitlistCapacity}
      </span>
    </div>
  );
}

function isValidTerm(quarter: string): boolean {
  const CurrMonth = new Date().getMonth() + 1;
  return ClassSearchUtils.isValidTermRange(currentTerm, quarter, CurrMonth) === true;
}
