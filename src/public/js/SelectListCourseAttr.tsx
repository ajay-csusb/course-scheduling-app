import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListCourseAttrProps {
  courseAttr: IOptionProps[];
  onChangeOfCourseAttr: (event: any) => void;
}

export class SelectListCourseAttr extends React.Component<ISelectListCourseAttrProps, {}> {

  public render(): React.ReactNode {
    return(
      <Label>
        Course Attribute
        <HTMLSelect
          className="course-attribute"
          onChange={this.props.onChangeOfCourseAttr}
          options={this.getCourseAttr()}
        />
      </Label>
    );
  }

  private getCourseAttr(): IOptionProps[] {
    return this.props.courseAttr;
  }

}
