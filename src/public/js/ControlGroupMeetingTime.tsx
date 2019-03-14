import React from 'react';
import { TimePicker, TimePrecision } from '@blueprintjs/datetime';
import { Label, FormGroup } from '@blueprintjs/core';

export interface IControlGroupMeetingTime {
  onChangeOfStartTime: (event: Date) => void;
  onChangeOfEndTime: (event: Date) => void;
  startTime: Date;
  endTime: Date;
}

export class ControlGroupMeetingTime extends React.Component<IControlGroupMeetingTime, {}> {
  constructor(props: IControlGroupMeetingTime) {
    super(props);
    this.handleChangeOfStartTime = this.handleChangeOfStartTime.bind(this);
    this.handleChangeOfEndTime = this.handleChangeOfEndTime.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <FormGroup>
      <Label>Meeting Time:</Label>
      <Label>Start Time:</Label>
      <TimePicker
        className="start-time"
        precision={TimePrecision.MINUTE}
        selectAllOnFocus={false}
        showArrowButtons={true}
        useAmPm={true}
        onChange={(event: Date) => (this.handleChangeOfStartTime(event))}
        value={this.props.startTime}
      />
      <Label>End Time:</Label>
      <TimePicker
        className="end-time"
        precision={TimePrecision.MINUTE}
        selectAllOnFocus={false}
        showArrowButtons={true}
        useAmPm={true}
        onChange={(event: Date) => (this.handleChangeOfEndTime(event))}
        value={this.props.endTime}
      />
      </FormGroup>
    );
  }

  private handleChangeOfStartTime(event: Date): void {
    this.props.onChangeOfStartTime(event);
  }

  private handleChangeOfEndTime(event: Date): void {
    this.props.onChangeOfEndTime(event);
  }
}
