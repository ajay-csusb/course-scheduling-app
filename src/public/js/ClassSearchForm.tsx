import * as React from 'react';
import { FormGroup, Button, ControlGroup } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import { renderClassSuggestProps } from './SuggestClasses';
import { RadioGroupQuarter } from './RadioGroupQuarter';
import { RadioGroupCampus } from './RadioGroupCampus';
import { ControlGroupMeetingTime } from './ControlGroupMeetingTime';
import { ControlGroupMeetingDate } from './ControlGroupMeetingDate';
import { IClass, IMeetingDate } from './Class';
import { renderInstructorSuggestProps } from './SuggestInstructors';
import { ISubject } from './Subject';
import { SelectListInstructionMode } from './SelectListInstructionMode';

interface ClassSearchFormProps {
  classes: IClass[];
  quarter: string;
  campus: string;
  subjects: ISubject[];
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructorName: string;
  instructors: string[];
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
  onChangeOfQuarter: (event: React.FormEvent) => void;
  onChangeOfCampus: (event: React.FormEvent) => void;
  onChangeOfStartTime: (event: any) => void;
  onChangeOfEndTime: (event: any) => void;
  onChangeOfMeetingDate: (event: any) => void;
  onChangeOfSubject: (event: any) => void;
  onChangeOfInstructionMode: (event: any) => void;
  onChangeOfInstructor: (event: any) => void;
  onSubmit: (event: any) => void;
  onReset: (event: any) => void;
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
          <label>Select a Subject:</label>
          <SuggestClasses
            {...renderClassSuggestProps}
            items={this.getSubjects()}
            className="search-autocomplete"
            openOnKeyDown={false}
            onItemSelect={this.props.onChangeOfSubject}
          />
        </ControlGroup>
        <br/>
        <ControlGroup>
          <label>Instructor:</label>
          <SuggestClasses
            {...renderInstructorSuggestProps}
            items={this.getInstructors()}
            className="search-instructor-autocomplete"
            openOnKeyDown={false}
            onItemSelect={this.props.onChangeOfInstructor}
          />
        </ControlGroup>
        <RadioGroupCampus
          campus={this.props.campus}
          onChangeOfCampus={this.props.onChangeOfCampus}
        />
        <ControlGroupMeetingTime
          onChangeOfStartTime={this.props.onChangeOfStartTime}
          onChangeOfEndTime={this.props.onChangeOfEndTime}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
        />
        <ControlGroupMeetingDate
          meetingDate={this.props.meetingDate}
          onChangeOfMeetingDate={this.props.onChangeOfMeetingDate}
        />
        <SelectListInstructionMode
          instructionMode={this.props.instructionMode}
          onChangeOfInstructionMode={this.props.onChangeOfInstructionMode}
        />
        <Button text="Submit" onClick={this.props.onSubmit} type="submit" className="bp3-intent-primary" />
        <Button text="Reset" onClick={this.props.onReset} style={{ float: 'right' }} type="reset" />
      </FormGroup >
    );
  }

  private getSubjects(): ISubject[] {
    return this.props.subjects;
  }

  private getInstructors(): string[] {
    return this.props.instructors;
  }
}
