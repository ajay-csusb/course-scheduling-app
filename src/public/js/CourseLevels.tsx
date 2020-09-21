import React from 'react';
import { ControlGroup, Checkbox, Alignment } from '@blueprintjs/core';
import { ICourseLevels } from './Class';

export interface ICourseLevelsProps {
  courseLevelsOptions: ICourseLevels;
  onChangeOfCourseLevelsOptions: (event: any) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export class CourseLevels extends React.Component<ICourseLevelsProps, {}> {
  constructor(props: ICourseLevelsProps) {
    super(props);
    this.handleChangeOfCourseLevelsOptions = this.handleChangeOfCourseLevelsOptions.bind(this);
  }

  public render(): React.ReactNode {
    const checkboxData = [
      ["thousand", "1000"],
      ["two-thousand", "2000"],
      ["three-thousand", "3000"],
      ["four-thousand", "4000"],
      ["five-thousand", "5000"],
      ["six-thousand", "6000"],
      ["seven-thousand", "7000"],
    ];
    const checkboxes: JSX.Element[] = [];
    
    for (let index = 0; index < checkboxData.length; index++) {
      checkboxes.push(
        <div className="form-item" key={index}>
          <Checkbox
            id={checkboxData[index][0]}
            className="course-levels-checkboxes"
            value={checkboxData[index][1]}
            onChange={(event: React.FormEvent) => this.handleChangeOfCourseLevelsOptions(event)}
            checked={this.props.courseLevelsOptions[checkboxData[index][1]]}
            onKeyDown={this.props.onKeyDown}
            inline={true}
            alignIndicator={Alignment.LEFT}
            label={checkboxData[index][1]}
          />
        </div>
      );
    }
      
    return (
      <ControlGroup fill={true} vertical={false} className="course-levels-filter-wrapper">
        <div id="course-levels-filter">
          <div className="label">Course Levels</div>
          {checkboxes}          
        </div>
      </ControlGroup>
    )
  }

  private handleChangeOfCourseLevelsOptions(event: React.FormEvent): void {
    this.props.onChangeOfCourseLevelsOptions(event);
  }
}
