import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListSessionCodeProps {
  sessionCode: string;
  onChangeOfSessionCode: (event: any) => void;
}

export class SelectListSessionCode extends React.Component<ISelectListSessionCodeProps, {}> {
  private readonly sessionCodes: IOptionProps[] = [
    { label: 'All', value: 'all' },
    { label: 'Early Start Program', value: 'ES' },
    { label: 'Eight weeks', value: '8W' },
    { label: 'Four weeks', value: '4W' },
    { label: 'Mini', value: 'MIN' },
    { label: 'OEE', value: 'OEE' },
    { label: 'OSHER', value: 'OLL' },
    { label: 'Palm Desert 1, 4 week', value: 'A11' },
    { label: 'Palm Desert 1, 8 week', value: 'A12' },
    { label: 'Palm Desert 1,12 week', value: 'A13' },
    { label: 'Palm Desert 2, 4 week', value: 'A21' },
    { label: 'Palm Desert 2, 8 week', value: 'A22' },
    { label: 'Palm Desert 2,12 week', value: 'A23' },
    { label: 'Regular', value: '1' },
    { label: 'Regular Non Standard', value: 'RNS' },
    { label: 'Self Non Standard', value: 'SNS' },
    { label: 'Self Support', value: 'SD' },
    { label: 'Six weeks', value: '6W' },
    { label: 'Ten weeks', value: '10W' },
    { label: 'Three weeks', value: '3W' },
    { label: 'Twelve weeks', value: '12W' },
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
