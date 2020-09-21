import * as React from 'react';
import { FormGroup, Button, Label, MenuItem, IOptionProps } from '@blueprintjs/core';
import { Suggest } from '@blueprintjs/select';
import { autocompleteSubjectsProps } from './AutocompleteSubjects';
import { SelectListQuarter } from './SelectListQuarter';
import { SelectListCampus } from './SelectListCampus';
import { ControlGroupMeetingTime } from './ControlGroupMeetingTime';
import { ControlGroupMeetingDay } from './ControlGroupMeetingDay';
import { IMeetingDate, ICareerLevels, ICourseLevels } from './Class';
import { autocompleteInstructorsProps } from './AutocompleteInstructors';
import { ISubject } from './Subject';
import { SelectListInstructionMode } from './SelectListInstructionMode';
import { AdvancedFilterFieldset } from './AdvancedFilterFieldset';

export interface IClassSearchFormProps {
  term: IOptionProps[];
  campus: string;
  subjects: ISubject[];
  meetingDate: IMeetingDate;
  instructionMode: string;
  instructors: string[];
  geClassesAttribute: string;
  geClassesAttributes: IOptionProps[];
  isReset?: boolean;
  startTime: Date;
  endTime: Date;
  courseNo: string;
  classNo: string;
  courseAttr: string;
  sessionCode: string;
  currentTermId: string;
  openClasses: boolean;
  careerLevelOptions: ICareerLevels;
  courseLevelsOptions: ICourseLevels;
  onChangeOfTerm: (event: React.FormEvent) => void;
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
  onChangeOfGeClassesAttribute: (event: any) => void;
  onChangeOfOpenClasses: (event: any) => void;
  onChangeOfCareerLevelOptions: (event: any) => void;
  onChangeOfCourseLevelsOptions: (event: any) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onSubmit: (event: any) => void;
  onReset: (event: any) => void;
}

export class ClassSearchForm extends React.Component<IClassSearchFormProps, {}> {
  constructor(props: IClassSearchFormProps) {
    super(props);
  }
  public render(): JSX.Element {
    const form = this.getForm();
    return <React.Fragment>{form}</React.Fragment>;
  }

  private getForm(): JSX.Element {
    const subjects = this.getSubjectsAutoCompleteComponent();
    const instructors = this.getInstructorsAutoCompleteComponent();
    const courseNumber = this.getCourseNumberComponent();
    const advancedFilter = this.getAdvancedFilterFieldset();
    return (
      <FormGroup>
        <div className="form-grid">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-6">
                  <div className="form-item">
                    <SelectListQuarter
                      currentTermId={this.props.currentTermId}
                      term={this.props.term}
                      onChangeOfTerm={this.props.onChangeOfTerm}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-item">
                    <SelectListCampus campus={this.props.campus} onChangeOfCampus={this.props.onChangeOfCampus} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-item">{subjects}</div>
                </div>
                <div className="col-6">
                  <div className="form-item">{courseNumber}</div>
                </div>
                <div className="col-6">
                  <div className="form-item">{instructors}</div>
                </div>
                <div className="col-6">
                  <div className="form-item">
                    <SelectListInstructionMode
                      instructionMode={this.props.instructionMode}
                      onChangeOfInstructionMode={this.props.onChangeOfInstructionMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-item">
                <ControlGroupMeetingDay
                  meetingDate={this.props.meetingDate}
                  onChangeOfMeetingDate={this.props.onChangeOfMeetingDate}
                  onKeyDown={this.props.onKeyDown}
                />
              </div>
              <ControlGroupMeetingTime
                onChangeOfStartTime={this.props.onChangeOfStartTime}
                onChangeOfEndTime={this.props.onChangeOfEndTime}
                startTime={this.props.startTime}
                endTime={this.props.endTime}
              />
            </div>
            <p>
              <strong>*The majority of Fall classes are online, please select “ALL” to see greater results</strong>
            </p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-item">{advancedFilter}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-item">
                <div className="form-buttons">
                  <Button
                    text="Submit"
                    onClick={this.props.onSubmit}
                    type="submit"
                    className="btn btn-primary btn-solid"
                  />
                  <Button
                    text="Reset"
                    onClick={this.props.onReset}
                    type="reset"
                    className="btn btn-secondary btn-solid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    );
  }

  private getSubjects(): ISubject[] {
    return this.props.subjects;
  }

  private getInstructors(): string[] {
    return this.props.instructors;
  }

  private isReset(): null | undefined {
    return this.props.isReset ? null : undefined;
  }

  private getSubjectsAutoCompleteComponent(): JSX.Element {
    const SuggestSubject = Suggest;
    return (
      <React.Fragment>
        <Label htmlFor="subject">Course Subject</Label>
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
      </React.Fragment>
    );
  }

  private getInstructorsAutoCompleteComponent(): JSX.Element {
    const SuggestInstructor = Suggest;
    return (
      <React.Fragment>
        <Label htmlFor="instructor">Instructor</Label>
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
      </React.Fragment>
    );
  }

  private getCourseNumberComponent(): JSX.Element {
    return (
      <React.Fragment>
        <Label htmlFor="course-number">Course Number</Label>
        <input
          id="course-number"
          className="course-number"
          type="text"
          placeholder="E.g. 211 for quarter or 2110 for semester"
          dir="auto"
          onChange={this.props.onChangeOfCourseNo}
          value={this.props.courseNo}
          onKeyDown={this.props.onKeyDown}
        />
      </React.Fragment>
    );
  }

  private getAdvancedFilterFieldset(): JSX.Element {
    return <AdvancedFilterFieldset {...this.props} />;
  }
}
