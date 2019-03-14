import * as React from 'react';
import { IClass, Class } from './Class';

interface ClassesRowProps {
  classes: IClass;
  quarter?: string;
  campus?: string;
  className?: string;
  meetingTime?: string;
  isReset?: boolean;
}
export class ClassesRow extends React.Component<ClassesRowProps> {
  public render(): JSX.Element {
    const classDetails: IClass = this.props.classes;
    const classObj = new Class(classDetails);
    const days = classObj.getClassMeetingDates();
    return (
      <tr>
        <td>{`${classDetails.subject} ${classDetails.catalogNo} ${classDetails.classSection}`}</td>
        <td>{classDetails.courseId}</td>
        <td>{classDetails.sessionCode}</td>
        <td>{classDetails.description}</td>
        <td>{classDetails.instructionMode}</td>
        <td>{classDetails.csuUnits}</td>
        <td>{days}</td>
        <td>{classDetails.facilityId}</td>
        <td>{classDetails.instructorName}</td>
        <td>{`${classDetails.enrolledCapacity} ${classDetails.enrolledTotal}`}</td>
        <td>{classDetails.ssrComponent}</td>
        <td>{classDetails.campus}</td>
        <td>{classDetails.amount}</td>
        <td>{classDetails.textbook}</td>
      </tr>
    );
  }
}
