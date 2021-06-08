import React, { Component } from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListResultsOptionsProps {
  limit: number;
  onChangeOfLimit: (event: any) => void;
}

export default class SelectListResultsOptions extends Component<ISelectListResultsOptionsProps, {}> {
  private readonly limits: IOptionProps[] = [
    { label: 'All classes', value: 'all' },
    { label: '30 classes', value: '30' },
    { label: '60 classes', value: '60' },
  ];

  public render(): React.ReactNode {
    return (
      <div className="show-dropdown">
        <Label htmlFor="results-options">Items Per Page</Label>
        <HTMLSelect
          id="results-options"
          value={this.props.limit}
          className="results-options"
          onChange={this.props.onChangeOfLimit}
          options={this.limits}
        />
      </div>
    );
  }
}
