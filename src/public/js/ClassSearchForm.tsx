import * as React from 'react';
import { FormGroup, Button, Label, MenuItem, IOptionProps } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import { autocompleteSubjectsProps } from './AutocompleteSubjects';
import { SelectListQuarter } from './SelectListQuarter';
import { SelectListCampus } from './SelectListCampus';
import { ControlGroupMeetingTime } from './ControlGroupMeetingTime';
import { ControlGroupMeetingDate } from './ControlGroupMeetingDate';
import { IMeetingDate } from './Class';
import { autocompleteInstructorsProps } from './AutocompleteInstructors';
import { ISubject } from './Subject';
import { SelectListInstructionMode } from './SelectListInstructionMode';
import { AdvancedFilterFieldset } from './AdvancedFilterFieldset';

interface IClassSearchFormProps {
  quarter: string;
  campus: string;
  subjects: ISubject[];
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructors: string[];
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
  courseNo: string;
  courseAttr: IOptionProps[];
  classNo: string;
  onChangeOfQuarter: (event: React.FormEvent) => void;
  onChangeOfCampus: (event: React.FormEvent) => void;
  onChangeOfStartTime: (event: any) => void;
  onChangeOfEndTime: (event: any) => void;
  onChangeOfMeetingDate: (event: any) => void;
  onChangeOfSubject: (event: any) => void;
  onChangeOfCourseNo: (event: any) => void;
  onChangeOfInstructionMode: (event: any) => void;
  onChangeOfInstructor: (event: any) => void;
  onChangeOfCourseAttr: (event: any) => void;
  onChangeOfSessionCode: (event: any) => void;
  onChangeOfClassNo: (event: any) => void;
  onSubmit: (event: any) => void;
  onReset: (event: any) => void;
}

export class ClassSearchForm extends React.Component<IClassSearchFormProps, {}> {

  constructor(props: IClassSearchFormProps) {
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
    const subjects = this.getSubjectsAutoCompleteComponent();
    const instructors = this.getInstructorsAutoCompleteComponent();
    const courseNumber = this.getCourseNumberComponent();
    const advancedFilter = this.getAdvancedFilterFieldset();
    return (
      <FormGroup label="Fill in one or more of the fields below:">
        <SelectListQuarter
          quarter={this.props.quarter}
          onChangeOfQuarter={this.props.onChangeOfQuarter}
        />
        {subjects}
        {courseNumber}
        {instructors}
        <SelectListCampus
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
        {advancedFilter}
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

  private isReset(): null | undefined {
    return (this.props.isReset) ? null : undefined;
  }

  private getSubjectsAutoCompleteComponent(): JSX.Element {
    const SuggestSubject = Suggest;
    return (
      <Label>
        Select a Subject
        <SuggestSubject
          {...autocompleteSubjectsProps}
          items={this.getSubjects()}
          className="search-autocomplete"
          openOnKeyDown={false}
          resetOnClose={true}
          noResults={<MenuItem disabled={true} text="Searching for subject..." />}
          onItemSelect={this.props.onChangeOfSubject}
          selectedItem={this.isReset()}
        />
      </Label>
    );
  }

  private getInstructorsAutoCompleteComponent(): JSX.Element {
    const SuggestInstructor = Suggest;
    return (
      <Label>
        Instructor
        <SuggestInstructor
          {...autocompleteInstructorsProps}
          items={this.getInstructors()}
          className="search-instructor-autocomplete"
          openOnKeyDown={false}
          resetOnClose={true}
          noResults={<MenuItem disabled={true} text="Searching for instructor..." />}
          onItemSelect={this.props.onChangeOfInstructor}
          selectedItem={this.isReset()}
        />
      </Label>
    );
  }

  private getCourseNumberComponent(): JSX.Element {
    return (
      <Label>
        Course Number
        <input
          className="bp3-input course-number"
          type="text"
          placeholder="E.g. 602"
          dir="auto"
          onChange={this.props.onChangeOfCourseNo}
          value={this.props.courseNo}
        />
      </Label>
    );
  }

  private getAdvancedFilterFieldset(): JSX.Element {
    return(
    <AdvancedFilterFieldset
      courseAttr={this.props.courseAttr}
      classNo={this.props.classNo}
      onChangeOfCourseAttr={this.props.onChangeOfCourseAttr}
      onChangeOfSessionCode={this.props.onChangeOfSessionCode}
      onChangeOfClassNo={this.props.onChangeOfClassNo}
    />
    );
  }

}
