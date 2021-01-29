import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListSessionCodeProps {
  sessionCode: string;
  onChangeOfSessionCode: (event: any) => void;
}

export class SelectListSessionCode extends React.Component<ISelectListSessionCodeProps, {}> {
  private readonly sessionCodes: IOptionProps[] = [
    { label: 'All', value: 'all' },
    { label: 'Fall and Spring (Regular)', value: '1' },
    { label: 'Summer terms (6 Week 1)', value: '6W1' },
    { label: 'Summer terms (6 Week 2)', value: '6W2' },
    { label: 'Summer terms (10 Week)', value: '10W' },
    { label: 'Winter Intersession (3 Week 1)', value: '3W1' },
  ];

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Label htmlFor="session-code">Session Code</Label>
        <HTMLSelect
          id="session-code"
          value={this.props.sessionCode}
          className="session-code"
          onChange={this.props.onChangeOfSessionCode}
          options={this.sessionCodes}
        />
      </React.Fragment>
    );
  }
}
