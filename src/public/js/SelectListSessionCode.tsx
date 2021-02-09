import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListSessionCodeProps {
  sessionCode: string;
  onChangeOfSessionCode: (event: any) => void;
}

export class SelectListSessionCode extends React.Component<ISelectListSessionCodeProps, {}> {
  private readonly sessionCodes: IOptionProps[] = [
    { label: 'Summer Session (6 Week 1)', value: '6W1' },
    { label: 'Summer Session (6 Week 2)', value: '6W2' },
    { label: 'Summer Session (10 Week)', value: '10W' },
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
