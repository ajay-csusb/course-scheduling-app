import React from 'react';
import { TimePicker, TimePrecision } from '@blueprintjs/datetime';
import { Label, ControlGroup } from '@blueprintjs/core';

export interface IControlGroupMeetingTimeProps {
  onChangeOfStartTime: (event: Date) => void;
  onChangeOfEndTime: (event: Date) => void;
  startTime: Date;
  endTime: Date;
}

export class ControlGroupMeetingTime extends React.Component<IControlGroupMeetingTimeProps, {}> {
  constructor(props: IControlGroupMeetingTimeProps) {
    super(props);
    this.handleChangeOfStartTime = this.handleChangeOfStartTime.bind(this);
    this.handleChangeOfEndTime = this.handleChangeOfEndTime.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <ControlGroup className="meeting-time row">
        <div className="col-md-6">
          <div className="form-item">
            <Label htmlFor="start-time">Meeting Start Time</Label>
            <TimePicker
              className="start-time"
              precision={TimePrecision.MINUTE}
              selectAllOnFocus={true}
              useAmPm={true}
              onChange={(event: Date) => (this.handleChangeOfStartTime(event))}
              value={this.props.startTime}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-item">
            <Label>Meeting End Time</Label>
            <TimePicker
              className="end-time"
              precision={TimePrecision.MINUTE}
              selectAllOnFocus={true}
              useAmPm={true}
              onChange={(event: Date) => (this.handleChangeOfEndTime(event))}
              value={this.props.endTime}
            />
          </div>
        </div>
      </ControlGroup>
    );
  }

  private handleChangeOfStartTime(event: Date): void {
    this.props.onChangeOfStartTime(event);
  }

  private handleChangeOfEndTime(event: Date): void {
    this.props.onChangeOfEndTime(event);
  }
}
