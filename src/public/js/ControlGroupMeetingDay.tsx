import React from 'react';
import { ControlGroup, Checkbox, Label } from '@blueprintjs/core';
import { IMeetingDate } from './Class';
export interface IControlGroupMeetingDayProps {
  meetingDate: IMeetingDate;
  onChangeOfMeetingDate: (event: React.FormEvent) => void;
}

export class ControlGroupMeetingDay extends React.Component<IControlGroupMeetingDayProps, {}> {

  constructor(props: IControlGroupMeetingDayProps) {
    super(props);
    this.handleChangeOfMeetingDate = this.handleChangeOfMeetingDate.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false} className="meeting-day">
        <Label>Meeting Day</Label>
        <Checkbox
          label="Mon"
          value="mon"
          className="mon"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.mon}
        />
        <Checkbox
          label="Tue"
          value="tue"
          className="tue"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.tue}
        />
        <Checkbox
          label="Wed"
          value="wed"
          className="wed"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.wed}
        />
        <Checkbox
          label="Thu"
          value="thu"
          className="thu"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.thu}
        />
        <Checkbox
          label="Fri"
          value="fri"
          className="fri"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.fri}
        />
        <Checkbox
          label="Sat"
          value="sat"
          className="sat"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.sat}
        />
        <Checkbox
          label="Sun"
          value="sun"
          className="sun"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.sun}
        />
      </ControlGroup>
    );
  }

  private handleChangeOfMeetingDate(event: React.FormEvent): void {
    this.props.onChangeOfMeetingDate(event);
  }
}
