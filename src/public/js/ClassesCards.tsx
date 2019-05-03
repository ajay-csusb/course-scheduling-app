import * as React from 'react';
import { IClass, Class } from './Class';
import { Card, Elevation } from '@blueprintjs/core';

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
    return (
        <Card key={classDetails.classNumber} interactive={true} elevation={Elevation.TWO}>
          <span>{`${classDetails.subject} ${classDetails.catalogNo} ${classDetails.classSection}`}</span>
          <h5><b>{classDetails.description}</b></h5><span>(Course No. {classDetails.courseId})</span>
          <span>Instructor: <a href={instructorProfileURL}>{classDetails.instructorName}</a></span>
          <span>Room: {classDetails.facilityId}</span>
          <span>Meeting Time: {time}</span>
          <span>Meeting Days: {days}</span>
          <span dangerouslySetInnerHTML={{__html: classDetails.textbook}}/>
        </Card>
      );
    }
  }
