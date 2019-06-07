import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Card, Elevation, Position, Popover, Classes } from '@blueprintjs/core';

interface ClassesCardsProps {
  classes: IClass;
}
export class ClassesCards extends React.Component<ClassesCardsProps> {

  readonly searchURL = 'https://search.csusb.edu';

  public render(): JSX.Element {
    const classDetails: IClass = this.props.classes;
    const classObj = new Class(classDetails);
    const days = classObj.getClassMeetingDates();
    const time = classObj.getClassMeetingTimes();
    const instructorProfileURL = this.searchURL + classDetails.profile;
    const campus = ClassSearchUtils.getCampusName(classDetails.campus);
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(classDetails);
    const classType = ClassSearchUtils.getClassType(classDetails);
    const classStatus = ClassSearchUtils.getClassStatus(classDetails);
    const instructionMode = ClassSearchUtils.getInstructionMode(classDetails);
    const instructorName = ClassSearchUtils.getInstructorName(classDetails);
    let instructor = <span>Instructor: N/A</span>;
    if (instructorName !== 'N/A') {
      instructor = <span>Instructor: <a href={instructorProfileURL}> {instructorName}</a></span>;
    }
    return (
      <Card key={classDetails.classNumber} interactive={true} elevation={Elevation.TWO}>
        <span>{`${classDetails.subject} ${classDetails.catalogNo} ${classDetails.classSection}`}</span><br />
        <Popover
          content={classDetails.longDescription}
          position={Position.RIGHT}
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        >
          <h5><b className={Classes.TOOLTIP_INDICATOR}>{classDetails.description}</b></h5>
        </Popover>
        <br />
        <span>(Class No. {classDetails.classNumber})</span>
        {instructor}
        <span>Room: {classDetails.buildingCode} {classDetails.room}</span>
        <span>Meeting Time: {time}</span>
        <span>Meeting Days: {days}</span>
        <span dangerouslySetInnerHTML={{ __html: classDetails.textbook }} /> <br />
        <span>Campus: {campus}</span> <br />
        <span>{classDetails.courseAttr}</span> <br />
        <span>No. of units: {classDetails.csuUnits}</span> <br />
        <span>No. of seats available: {noOfSeatsAvailable}</span> <br />
        <span>In waitlist  : {classDetails.waitlistTotal}</span> <br />
        <span>Session type: {classDetails.sessionCode}</span> <br />
        <span>{classType}</span> <br />
        <span>{classStatus}</span> <br />
        <span>{instructionMode}</span> <br />
      </Card >
      );
    }

  }
