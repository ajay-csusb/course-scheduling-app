import React from 'react';
import { ControlGroup, Checkbox, Label } from '@blueprintjs/core';
import { IMeetingDate } from './ClassSearchContainer';
export interface IControlGroupMeetingDate {
  meetingDate: IMeetingDate;
  onChangeOfMeetingDate: (event: React.FormEvent) => void;
}

export class ControlGroupMeetingDate extends React.Component<IControlGroupMeetingDate, {}> {

  constructor(props: IControlGroupMeetingDate) {
    super(props);
    this.handleChangeOfMeetingDate = this.handleChangeOfMeetingDate.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false}>
        <Label>Meeting Date</Label>
        <Checkbox
          label="All"
          value="all"
          className="all-date"
          onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
          checked={this.props.meetingDate.all}
        />
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
