import * as React from 'react';
import { FormGroup, Button, ControlGroup } from '@blueprintjs/core';
import { IMeetingTime, IMeetingDate } from './ClassSearchContainer';
import { Suggest } from '@blueprintjs/select';
import { renderClassSuggestProps } from './SuggestClasses';
import { RadioGroupQuarter } from './RadioGroupQuarter';
import { RadioGroupCampus } from './RadioGroupCampus';
import { ControlGroupMeetingTime } from './ControlGroupMeetingTime';
import { ControlGroupMeetingDate } from './ControlGroupMeetingDate';

interface ClassSearchFormProps {
  classes: [];
  quarter: string;
  campus: string;
  courseId: string;
  meetingTime: IMeetingTime;
  meetingDate: IMeetingDate;
  isReset?: boolean;
  onChangeOfQuarter: (event: React.FormEvent) => void;
  onChangeOfCampus: (event: React.FormEvent) => void;
  onChangeOfMeetingTime: (event: any) => void;
  onChangeOfMeetingDate: (event: any) => void;
  onChangeOfClassName: (event: any) => void;
}

export class ClassSearchForm extends React.Component<ClassSearchFormProps, {}> {

  constructor(props: ClassSearchFormProps) {
    super(props);
  }
  public render(): JSX.Element {
    const form = this.getForm();
    return (
      <div>
        {form}
      </div>
    );
  }

  private getForm(): JSX.Element {
    const SuggestClasses = Suggest;
    return (
      <FormGroup label="Fill in one or more of the fields below:">
        <RadioGroupQuarter
          quarter={this.props.quarter}
          onChangeOfQuarter={this.props.onChangeOfQuarter}
        />
        <ControlGroup>
          <label>Enter class:</label>
          <SuggestClasses
            {...renderClassSuggestProps}
            items={this.props.classes}
            className="search-autocomplete"
            onItemSelect={this.props.onChangeOfClassName}
          />
        </ControlGroup>
        <br/>
        <RadioGroupCampus
          campus={this.props.campus}
          onChangeOfCampus={this.props.onChangeOfCampus}
        />
        <ControlGroupMeetingTime
          meetingTime={this.props.meetingTime}
          onChangeOfMeetingTime={this.props.onChangeOfMeetingTime}
        />
        <ControlGroupMeetingDate
          meetingDate={this.props.meetingDate}
          onChangeOfMeetingDate={this.props.onChangeOfMeetingDate}
        />
        <Button text="Submit" type="submit" className="bp3-intent-primary" />
        <Button text="Reset" style={{ float: 'right' }} type="reset" />
      </FormGroup >
    );
  }
}
