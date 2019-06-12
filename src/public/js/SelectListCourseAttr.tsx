import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListCourseAttrProps {
  onChangeOfCourseAttr: (event: any) => void;
}

export class SelectListCourseAttr extends React.Component<ISelectListCourseAttrProps, {}> {

  private readonly courseAttr: IOptionProps[] = [
      { label: 'All', value: '' },
      { label: 'Early Start Program', value: 'ESP' },
      { label: 'Fully Online', value: 'FONL' },
      { label: 'General Education', value: 'GE' },
      { label: 'Service Learning', value: 'CSLI' },
      { label: 'Study Abroad', value: 'SA' },
      { label: 'Zero Cost Course Materials', value: 'ZCCM' },
      { label: 'eBook', value: 'EBK' },
    ];

  public render(): React.ReactNode {
    return(
      <Label>
        Course Attribute
        <HTMLSelect
          className="course-attribute"
          onChange={this.props.onChangeOfCourseAttr}
          options={this.courseAttr}
        />
      </Label>
    );
  }

}
