import React from 'react';
import { Label, HTMLSelect } from '@blueprintjs/core';

export interface ISelectListCourseAttrProps {
  courseAttr: string[];
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

  private getCourseAttr(): string[] {
    return this.props.courseAttr;
  }

}
