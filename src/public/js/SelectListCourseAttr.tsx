import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListCourseAttrProps {
  courseAttr: string;
  onChangeOfCourseAttr: (event: any) => void;
}

export class SelectListCourseAttr extends React.Component<ISelectListCourseAttrProps, {}> {
  private readonly courseAttr: IOptionProps[] = [
    { label: 'Add course attribute', value: 'all' },
    { label: 'Asian Studies', value: 'ASTD' },
    { label: 'Chicano(a)/Latino(a) Studies', value: 'CLST' },
    { label: 'eBook', value: 'EBK' },
    { label: 'Ethnic Studies', value: 'ETHN' },
    { label: 'GE Designation', value: 'DES' },
    { label: 'Gender and Sexuality Studies', value: 'GSS' },
    { label: 'High Impact Practices', value: 'HIPS' },
    { label: 'Latin American Studies', value: 'LTAM' },
    { label: 'Low Cost Course Materials', value: 'LCCM' },
    { label: 'Service Learning', value: 'CSLI' },
    { label: 'Study Abroad', value: 'SA' },
    { label: "Women's Studies", value: 'WSTD' },
    { label: 'Writing Intensive (Non-GE)', value: 'WI' },
    { label: 'Zero Cost Course Materials', value: 'ZCCM' },
  ];

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Label htmlFor="course-attribute">Course Attribute</Label>
        <HTMLSelect
          id="course-attribute"
          value={this.props.courseAttr}
          className="course-attribute"
          onChange={this.props.onChangeOfCourseAttr}
          options={this.courseAttr}
        />
      </React.Fragment>
    );
  }
}
