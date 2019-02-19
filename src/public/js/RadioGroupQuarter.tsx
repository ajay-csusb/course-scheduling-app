import React from 'react';
import { RadioGroup, Radio } from '@blueprintjs/core';
export interface IRadioGroupQuarterProps {
    quarter: string;
    onChangeOfQuarter: (event: React.FormEvent) => void;
}
export class RadioGroupQuarter extends React.Component<IRadioGroupQuarterProps, {}> {
  constructor(props: IRadioGroupQuarterProps) {
    super(props);
    this.handleChangeOfQuarter = this.handleChangeOfQuarter.bind(this);
  }
  public render(): React.ReactNode {
    return (
      <RadioGroup
        label="Quarter"
        inline={true}
        onChange={(event: React.FormEvent) => (this.handleChangeOfQuarter(event))}
        selectedValue={this.props.quarter}
      >
        <Radio label="Winter 2019" value="current" className="current-quarter" />
        <Radio label="Spring 2019" value="next-quarter" className="next-quarter" />
      </RadioGroup>
    );
  }
  private handleChangeOfQuarter(event: React.FormEvent): void {
    this.props.onChangeOfQuarter(event);
  }
}
