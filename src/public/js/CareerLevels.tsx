import React from 'react';
import { ControlGroup, Checkbox, Alignment } from '@blueprintjs/core';
import { ICareerLevels } from './Class';

export interface ICareerLevelsProps {
  careerLevelsOptions: ICareerLevels;
  onChangeOfCareerLevelsOptions: (event: any) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export class CareerLevels extends React.Component<ICareerLevelsProps, {}> {
  constructor(props: ICareerLevelsProps) {
    super(props);
    this.handleChangeOfCareerLevelsOptions = this.handleChangeOfCareerLevelsOptions.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false} className="career-levels-filter-wrapper">
        <div className="label">Career Levels</div>
        <div id="career-levels-filter">
          <div className="form-item">
            <Checkbox
              id="ugrd"
              value="ugrd"
              className="career-levels-checkboxes"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelsOptions(event)}
              checked={this.props.careerLevelsOptions.ugrd}
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
              className="career-levels-checkboxes"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelsOptions(event)}
              checked={this.props.careerLevelsOptions.pbac}
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
              className="career-levels-checkboxes"
              onChange={(event: React.FormEvent) => this.handleChangeOfCareerLevelsOptions(event)}
              checked={this.props.careerLevelsOptions.exed}
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

  private handleChangeOfCareerLevelsOptions(event: React.FormEvent): void {
    this.props.onChangeOfCareerLevelsOptions(event);
  }
}
