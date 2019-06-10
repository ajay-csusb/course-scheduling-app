import React from 'react';
import { Collapse, Label, IOptionProps } from '@blueprintjs/core';
import { SelectListCourseAttr } from './SelectListCourseAttr';
import { SelectListSelectionCode } from './SelectListSessionCode';

interface IAdvancedFilterFieldsetProps {
  courseAttr: IOptionProps[];
  classNo: string;
  onChangeOfCourseAttr: (event: any) => void;
  onChangeOfSessionCode: (event: any) => void;
  onChangeOfClassNo: (event: any) => void;
}

interface IAdvancedFilterFieldsetState {
  isOpen?: boolean;
}

export class AdvancedFilterFieldset extends React.Component<
    IAdvancedFilterFieldsetProps, IAdvancedFilterFieldsetState> {
  constructor(props: IAdvancedFilterFieldsetProps) {
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
    return (
      <div>
        <a id="additional-filters" onClick={this.handleClick}>
          {this.state.isOpen ? 'Hide' : ''} Additional Filters
        </a>
        <Collapse isOpen={this.state.isOpen}>
          <p>Filter classes by</p>
          {courseAttr}
          {classNumber}
          {sessionCode}
        </Collapse>
      </div>
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
      <Label>
        Class Number
      <input
          className="bp3-input class-number"
          type="text"
          placeholder="E.g. 60256"
          dir="auto"
          onChange={this.props.onChangeOfClassNo}
          value={this.props.classNo}
      />
      </Label>
    );
  }

  private getSelectListSessionCodeComponent(): JSX.Element {
    return (
      <SelectListSelectionCode
        onChangeOfSessionCode={this.props.onChangeOfSessionCode}
      />
    );
  }

}
