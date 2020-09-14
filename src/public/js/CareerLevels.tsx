import React from 'react';
import { ControlGroup, Checkbox, Alignment } from '@blueprintjs/core';
import { ICareerLevels } from './Class';

export interface ICareerLevelsProps {
  careerLevelOptions: ICareerLevels;
  onChangeOfCareerLevelOptions: (event: any) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export class CareerLevels extends React.Component<ICareerLevelsProps, {}> {
  constructor(props: ICareerLevelsProps) {
    super(props);
    this.handleChangeOfCareerLevelOptions = this.handleChangeOfCareerLevelOptions.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false} className="career-levels-filter-wrapper">
        <div id="career-levels-filter">
          <div className="label">Career Levels</div>
          <div className="form-item">
            <Checkbox
              id="ugrd"
              value="ugrd"
              className="ugrd"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelOptions(event)}
              checked={this.props.careerLevelOptions.ugrd}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Undergraduate"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="pbac"
              value="pbac"
              className="pbac"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelOptions(event)}
              checked={this.props.careerLevelOptions.pbac}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Post baccalaureate"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="exed"
              value="exed"
              className="exed"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelOptions(event)}
              checked={this.props.careerLevelOptions.exed}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Extended education"
            />
          </div>
        </div>
      </ControlGroup>
    );
  }

  private handleChangeOfCareerLevelOptions(event: React.FormEvent): void {
    this.props.onChangeOfCareerLevelOptions(event);
  }
}
