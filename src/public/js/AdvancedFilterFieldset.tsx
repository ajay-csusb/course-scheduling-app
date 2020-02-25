import React from 'react';
import { Collapse, Label } from '@blueprintjs/core';
import { SelectListCourseAttr } from './SelectListCourseAttr';
import { SelectListSessionCode } from './SelectListSessionCode';
import { SelectListGeClassesAttributes } from './SelectListGeClassesAttributes';
import { IClassSearchFormProps } from './ClassSearchForm';

interface IAdvancedFilterFieldsetState {
  isOpen?: boolean;
}

export class AdvancedFilterFieldset extends React.Component<
    IClassSearchFormProps, IAdvancedFilterFieldsetState> {
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
    const arrow = (this.state.isOpen) ? <i className="fal fa-chevron-up"/> : <i className="fal fa-chevron-down"/>;
    return (
      <React.Fragment>
        <a id="additional-filters" onClick={this.handleClick}>
          {this.state.isOpen ? 'Hide' : ''} Additional Search Criteria {arrow}
        </a>
        <Collapse isOpen={this.state.isOpen} >
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
          </div>
        </Collapse>
      </React.Fragment>
    );
  }

  private handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private getSelectListCourseAttrComponent(): JSX.Element {
    return (
      <SelectListCourseAttr
        courseAttr={this.props.courseAttr}
        onChangeOfCourseAttr={this.props.onChangeOfCourseAttr}
      />
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
        geClassesAttributes={this.props.geClassesAttributes}
        geClassesAttribute={this.props.geClassesAttribute}
        onChangeOfGeClassesAttribute={this.props.onChangeOfGeClassesAttribute}
      />
    );
  }

}
