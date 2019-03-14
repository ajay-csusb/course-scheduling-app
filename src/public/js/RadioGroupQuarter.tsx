import React from 'react';
import { RadioGroup, Radio } from '@blueprintjs/core';
import { Quarter } from './Quarter';
import * as ClassSearchUtils from './ClassSearchUtils';
export interface IRadioGroupQuarterProps {
    quarter: string;
    onChangeOfQuarter: (event: React.FormEvent) => void;
}

export class RadioGroupQuarter extends React.Component<IRadioGroupQuarterProps, {}> {

  readonly quarterUrl = 'http://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST';
  constructor(props: IRadioGroupQuarterProps) {
    super(props);
    this.handleChangeOfQuarter = this.handleChangeOfQuarter.bind(this);
    this.getCurrentQuarterLabel = this.getCurrentQuarterLabel.bind(this);
    this.getPrevQuarterLabel = this.getPrevQuarterLabel.bind(this);
    this.parseQuarterOnSuccess = this.parseQuarterOnSuccess.bind(this);
    this.logOnError = this.logOnError.bind(this);
  }

  componentDidMount() {
    ClassSearchUtils.fetchData(this.quarterUrl, this.parseQuarterOnSuccess, this.logOnError);
  }

  public render(): React.ReactNode {
    return (
      <RadioGroup
        label="Quarter"
        inline={true}
        onChange={(event: React.FormEvent) => (this.handleChangeOfQuarter(event))}
        selectedValue={this.props.quarter}
      >
        <Radio label={this.getCurrentQuarterLabel()} value="current" className="current-quarter" />
        <Radio label={this.getPrevQuarterLabel()} value="prev" className="prev-quarter" />
      </RadioGroup>
    );
  }

  private handleChangeOfQuarter(event: React.FormEvent): void {
    this.props.onChangeOfQuarter(event);
  }

  private getCurrentQuarterLabel(): string {
    return localStorage.getItem('currentQuarter') as string;
  }

  private getPrevQuarterLabel(): string {
    return localStorage.getItem('previousQuarter') as string;
  }

  private async parseQuarterOnSuccess(results: any): Promise<any> {
    let currQ: any = [];
    if (ClassSearchUtils.isObjectEmpty(results)) {
      return null;
    }
    results.forEach((_result: any) => {
      if (_result.displayed_FLAG === 'Y' && _result.default_FLG === 'Y') {
        currQ = _result;
      }
    });
    const quarterClass = new Quarter(currQ);
    this.setCurrentQuarterInStorage(quarterClass);
    this.setPreviousQuarterInStorage(quarterClass);
    Quarter.setCurrentQuarterId(currQ.strm);
  }

  private setCurrentQuarterInStorage(quarter: Quarter): void {
    this.setQuarterInLocalStorage('currentQuarter', quarter.getCurrentQuarter());
  }

  private setPreviousQuarterInStorage(quarter: Quarter): void {
    this.setQuarterInLocalStorage('previousQuarter', quarter.getPreviousQuarter());
  }

  private setQuarterInLocalStorage(quarterKey: string, quarterValue: string): void {
    ClassSearchUtils.saveOrUpdateLocalStorage(quarterKey, quarterValue);
  }

  private logOnError(error: string): void {
    console.log(error);
  }

}
