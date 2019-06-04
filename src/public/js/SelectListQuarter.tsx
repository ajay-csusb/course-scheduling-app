import React from 'react';
import { Label } from '@blueprintjs/core';
import { Quarter } from './Quarter';
import * as ClassSearchUtils from './ClassSearchUtils';
export interface ISelectListQuarterProps {
    quarter: string;
    onChangeOfQuarter: (event: React.FormEvent) => void;
}

export class SelectListQuarter extends React.Component<ISelectListQuarterProps, {}> {

  readonly quarterUrl = 'https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList';
  constructor(props: ISelectListQuarterProps) {
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
    const currentQuarterLabel = this.getCurrentQuarterLabel();
    const prevQuarterLabel = this.getPrevQuarterLabel();
    return (
      <Label>
        Term
        <div className="bp3-select select-quarter">
          <select onChange={this.handleChangeOfQuarter}>
            <option label={currentQuarterLabel} value="current" className="current-quarter">
              {currentQuarterLabel}
            </option>
            <option label={prevQuarterLabel} value="prev" className="prev-quarter">
              {prevQuarterLabel}
            </option>
            </select>
        </div>
      </Label>
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
    if (ClassSearchUtils.isObjectEmpty(results)) {
      return null;
    }
    let currQ: any = [];
    const quarters = results.termList;
    quarters.forEach((_quarter: any) => {
      if (this.hasCurrentQuarterFlag(_quarter)) {
        currQ = _quarter;
      }
    });
    this.updateLocalStorage(currQ);
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

  private hasCurrentQuarterFlag(quarter: any): boolean {
    return (quarter.displayed_FLAG === 'Y' && quarter.default_FLG === 'Y');
  }

  private updateLocalStorage(quarter: any): void {
    const quarterInstance = new Quarter(quarter);
    this.setCurrentQuarterInStorage(quarterInstance);
    this.setPreviousQuarterInStorage(quarterInstance);
  }

}
