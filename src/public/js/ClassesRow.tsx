import * as React from 'react';

interface ClassesRowProps {
  classes?: any;
  quarter?: string;
  campus?: string;
  className?: string;
  meetingTime?: string;
  isReset?: boolean;
}
export class ClassesRow extends React.Component<ClassesRowProps> {
  public render(): JSX.Element {
    const classDetails = this.props.classes;
    return (
      <tr>
        <td>{`${classDetails.subject} ${classDetails.catalog_NBR} ${classDetails.class_SECTION}`}</td>
        <td>{classDetails.crse_ID}</td>
        <td>{classDetails.session_CODE}</td>
        <td>{classDetails.descr}</td>
        <td>{classDetails.instruction_MODE}</td>
        <td>{classDetails.csu_APDB_CMP_UNITS}</td>
        <td>Days</td>
        <td>{classDetails.facility_ID}</td>
        <td>{classDetails.name}</td>
        <td>{`${classDetails.enrl_CAP} ${classDetails.enrl_TOT}`}</td>
        <td>{classDetails.ssr_COMPONENT}</td>
        <td>{classDetails.campus}</td>
        <td>{classDetails.flat_AMT}</td>
        <td>View Textbook</td>
      </tr>
    );
  }
}
