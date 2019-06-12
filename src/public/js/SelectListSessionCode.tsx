import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListSessionCodeProps {
  onChangeOfSessionCode: (event: any) => void;
}

export class SelectListSelectionCode extends React.Component<ISelectListSessionCodeProps, {}> {
  private readonly sessionCodes: IOptionProps[] = [
    { label: 'All', value: 'all' },
    { label: '10 weeks', value: '10W' },
    { label: 'ESP1', value: 'ES1' },
    { label: 'ESP2', value: 'ES2' },
    { label: 'ESP3', value: 'ES3' },
    { label: 'ESP4', value: 'ES4' },
    { label: 'ESP5', value: 'ES5' },
    { label: 'Eight weeks 1', value: '8W1' },
    { label: 'Eight weeks 2', value: '8W2' },
    { label: 'Four weeks 1', value: '4W1' },
    { label: 'Four weeks 2', value: '4W2' },
    { label: 'Four weeks 3', value: '4W3' },
    { label: 'Four weeks 4', value: '4W4' },
    { label: 'Mini', value: 'MIN' },
    { label: 'OEE', value: 'OEE' },
    { label: 'OSHER', value: 'OLL' },
    { label: 'Palm Desert 1, 4 week', value: 'A11' },
    { label: 'Palm Desert 1, 8 week', value: 'A12' },
    { label: 'Palm Desert 1,12 week', value: 'A13' },
    { label: 'Palm Desert 2, 4 week', value: 'A21' },
    { label: 'Palm Desert 2, 8 week', value: 'A22' },
    { label: 'Palm Desert 2,12 week', value: 'A23' },
    { label: 'Regular Non Standard', value: 'RNS' },
    { label: 'Regular', value: '1' },
    { label: 'Self Support', value: 'SSD' },
    { label: 'Self Support 1', value: 'SD1' },
    { label: 'Self Support 2', value: 'SD2' },
    { label: 'Six weeks 1', value: '6W1' },
    { label: 'Six weeks 2', value: '6W2' },
    { label: 'Six weeks 3', value: '6W3' },
    { label: 'Self Non Standard', value: 'SNS' },
    { label: 'Three weeks 1', value: '3W1' },
    { label: 'Three weeks 2', value: '3W2' },
    { label: 'Three weeks 3', value: '3W3' },
    { label: 'Twelve weeks', value: '12W' },
  ];

  public render(): React.ReactNode {
    return (
      <Label>
        Session
        <HTMLSelect
          className="session-code"
          onChange={this.props.onChangeOfSessionCode}
          options={this.sessionCodes}
        />
      </Label>
    );
  }

}
