import React from 'react';
import { Collapse } from '@blueprintjs/core';
import { SelectListCourseAttr } from './SelectListCourseAttr';

interface IAdvancedFilterFieldsetProps {
  courseAttr: string[];
  onChangeOfCourseAttr: (event: any) => void;
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
    return (
      <div>
        <a onClick={this.handleClick}>
          {this.state.isOpen ? 'Hide' : 'Show'} Additional Filters
        </a>
        <Collapse isOpen={this.state.isOpen}>
          <p>Filter classes by</p>
          {courseAttr}
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

}
