import React from 'react';
import { Collapse } from '@blueprintjs/core';

interface IAdvancedFilterFieldsetState {
  isOpen?: boolean;
}

export class AdvancedFilterFieldset extends React.Component<{}, IAdvancedFilterFieldsetState> {
  constructor(props: IAdvancedFilterFieldsetState) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <div>
        <a onClick={this.handleClick}>
          {this.state.isOpen ? 'Hide' : 'Show'} Additional Filters
        </a>
        <Collapse isOpen={this.state.isOpen}>
          <p>Filter classes by</p>
        </Collapse>
      </div>
    );
  }

  private handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
}
