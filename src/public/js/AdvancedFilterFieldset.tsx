import React from 'react';
import { Collapse, Label } from '@blueprintjs/core';
import { SelectListCourseAttr } from './SelectListCourseAttr';
import { SelectListSessionCode } from './SelectListSessionCode';
import { SelectListGeClassesAttributes } from './SelectListGeClassesAttributes';
import { IClassSearchFormProps } from './ClassSearchForm';
import { OpenClasses } from './OpenClasses';
import { CareerLevels } from './CareerLevels';
import { CourseLevels } from './CourseLevels';

interface IAdvancedFilterFieldsetState {
  isOpen?: boolean;
}

export class AdvancedFilterFieldset extends React.Component<IClassSearchFormProps, IAdvancedFilterFieldsetState> {
  constructor(props: IClassSearchFormProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const courseAttr = this.getSelectListCourseAttrComponent();
    const classNumber = this.getClassNumberComponent();
    const sessionCode = this.getSelectListSessionCodeComponent();
    const geClassesAttribute = this.getSelectListGeClassesAttributesComponent();
    const arrow = this.state.isOpen ? <i className="fal fa-chevron-up" /> : <i className="fal fa-chevron-down" />;
    const openClassesComponent = this.getOpenClassesComponent();
    const careerLevelsComponent = this.getCareerLevelsComponent();
    const courseLevelsComponent = this.getCourseLevelsComponent();

    return (
      <React.Fragment>
        <a id="additional-filters" onClick={this.handleClick}>
          {this.state.isOpen ? 'Hide' : ''} Additional Search Criteria {arrow}
        </a>
        <Collapse isOpen={this.state.isOpen}>
          <div className="row">
            <div className="col-6 col-md-4">
              <div className="form-item">{geClassesAttribute}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{courseAttr}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{classNumber}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{sessionCode}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{openClassesComponent}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{careerLevelsComponent}</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-item">{courseLevelsComponent}</div>
            </div>
          </div>
        </Collapse>
      </React.Fragment>
    );
  }

  private handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private getSelectListCourseAttrComponent(): JSX.Element {
    return (
      <SelectListCourseAttr courseAttr={this.props.courseAttr} onChangeOfCourseAttr={this.props.onChangeOfCourseAttr} />
    );
  }

  private getClassNumberComponent(): JSX.Element {
    return (
      <React.Fragment>
        <Label htmlFor="class-number">Class Number</Label>
        <input
          id="class-number"
          className="class-number"
          type="text"
          placeholder="E.g. 60256"
          dir="auto"
          onChange={this.props.onChangeOfClassNo}
          value={this.props.classNo}
          onKeyDown={this.props.onKeyDown}
        />
      </React.Fragment>
    );
  }

  private getSelectListSessionCodeComponent(): JSX.Element {
    return (
      <SelectListSessionCode
        sessionCode={this.props.sessionCode}
        onChangeOfSessionCode={this.props.onChangeOfSessionCode}
      />
    );
  }

  private getSelectListGeClassesAttributesComponent(): JSX.Element {
    return (
      <SelectListGeClassesAttributes
        currentTerm={this.props.currentTermId}
        geClassesAttributes={this.props.geClassesAttributes}
        geClassesAttribute={this.props.geClassesAttribute}
        onChangeOfGeClassesAttribute={this.props.onChangeOfGeClassesAttribute}
      />
    );
  }

  private getOpenClassesComponent(): JSX.Element {
    return (
      <OpenClasses openClasses={this.props.openClasses} onChangeOfOpenClasses={this.props.onChangeOfOpenClasses} />
    );
  }

  private getCareerLevelsComponent(): JSX.Element {
    return (
      <CareerLevels
        careerLevelOptions={this.props.careerLevelOptions}
        onChangeOfCareerLevelOptions={this.props.onChangeOfCareerLevelOptions}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }

  private getCourseLevelsComponent(): JSX.Element {
    return (
      <CourseLevels 
        courseLevelsOptions={this.props.courseLevelsOptions}
        onChangeOfCourseLevelsOptions={this.props.onChangeOfCourseLevelsOptions}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}
