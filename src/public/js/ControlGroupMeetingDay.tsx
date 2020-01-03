import React from 'react';
import { ControlGroup, Checkbox, Alignment } from '@blueprintjs/core';
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
        <div className="label">Course Meeting Day</div>
        <div id="meeting-day">
          <div className="form-item">
            <Checkbox
              id="mon"
              value="mon"
              className="mon"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.mon}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Mon"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="tue"
              value="tue"
              className="tue"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.tue}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Tue"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="wed"
              value="wed"
              className="wed"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.wed}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Wed"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="thu"
              value="thu"
              className="thu"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.thu}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Thu"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="fri"
              value="fri"
              className="fri"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.fri}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Fri"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="sat"
              value="sat"
              className="sat"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.sat}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Sat"
            />
          </div>
          <div className="form-item">
            <Checkbox
              id="sun"
              value="sun"
              className="sun"
              onChange={(event: React.FormEvent) => (this.handleChangeOfMeetingDate(event))}
              checked={this.props.meetingDate.sun}
              onKeyDown={this.props.onKeyDown}
              inline={true}
              alignIndicator={Alignment.LEFT}
              label="Sun"
            />
          </div>
        </div>
      </ControlGroup>
    );
  }

  private handleChangeOfMeetingDate(event: React.FormEvent): void {
    this.props.onChangeOfMeetingDate(event);
  }
}
