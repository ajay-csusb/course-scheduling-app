import React from 'react';
import { ControlGroup, Checkbox, Label } from '@blueprintjs/core';
import { IMeetingTime } from './ClassSearchContainer';

export interface IControlGroupMeetingTime {
  meetingTime: IMeetingTime;
  onChangeOfMeetingTime: (event: React.FormEvent) => void;
}

export class ControlGroupMeetingTime extends React.Component<IControlGroupMeetingTime, {}> {
  constructor(props: IControlGroupMeetingTime) {
    super(props);
    this.handleChangeOfMeetingTime = this.handleChangeOfMeetingTime.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false}>
        <Label>Desired Meeting Time</Label>
        <Checkbox
          label="All"
          value="all"
          className="all"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingTime(event))}
          checked={this.props.meetingTime.all}
        />
        <Checkbox
          label="Before Noon"
          value="before-noon"
          className="before-noon"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingTime(event))}
          checked={this.props.meetingTime.beforeNoon}
        />
        <Checkbox
          label="After Noon"
          value="after-noon"
          className="after-noon"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingTime(event))}
          checked={this.props.meetingTime.afterNoon}
        />
        <Checkbox
          label="4 PM and later"
          value="evening"
          className="evening"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingTime(event))}
          checked={this.props.meetingTime.evening}
        />
      </ControlGroup>
    );
  }

  private handleChangeOfMeetingTime(event: React.FormEvent): void {
    this.props.onChangeOfMeetingTime(event);
  }
}
