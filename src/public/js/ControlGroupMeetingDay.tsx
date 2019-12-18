import React from 'react';
import { ControlGroup, Checkbox, Label } from '@blueprintjs/core';
import { IMeetingDate } from './Class';
export interface IControlGroupMeetingDayProps {
  meetingDate: IMeetingDate;
  onChangeOfMeetingDate: (event: React.FormEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

export class ControlGroupMeetingDay extends React.Component<IControlGroupMeetingDayProps, {}> {

  constructor(props: IControlGroupMeetingDayProps) {
    super(props);
    this.handleChangeOfMeetingDate = this.handleChangeOfMeetingDate.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup fill={true} vertical={false} className="meeting-day">
        <div>Course Meeting Day</div>
        <div className="form-item">
          <Label htmlFor="mon">Mon</Label>
          <Checkbox
            id="mon"
            value="mon"
            className="mon"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.mon}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="tue">Tue</Label>
          <Checkbox
            id="tue"
            value="tue"
            className="tue"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.tue}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="wed">Wed</Label>
          <Checkbox
            id="wed"
            value="wed"
            className="wed"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.wed}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="thu">Thu</Label>
          <Checkbox
            id="thu"
            value="thu"
            className="thu"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.thu}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="fri">Fri</Label>
          <Checkbox
            id="fri"
            value="fri"
            className="fri"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.fri}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="sat">Sat</Label>
          <Checkbox
            id="sat"
            value="sat"
            className="sat"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.sat}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
        <div className="form-item">
          <Label htmlFor="sun">Sun</Label>
          <Checkbox
            id="sun"
            value="sun"
            className="sun"
            onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
            checked={this.props.meetingDate.sun}
            onKeyDown={this.props.onKeyDown}
          />
        </div>
      </ControlGroup>
    );
  }

  private handleChangeOfMeetingDate(event: React.FormEvent): void {
    this.props.onChangeOfMeetingDate(event);
  }
}
