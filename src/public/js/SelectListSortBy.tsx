import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListSortByProps {
  sortBy: string;
  onChangeOfSortBy: (event: any) => void;
}

export class SelectListSortBy extends React.Component<ISelectListSortByProps, {}> {
  constructor(props: ISelectListSortByProps) {
    super(props);
    this.handleChangeOfSortBy = this.handleChangeOfSortBy.bind(this);
  }
  public render(): React.ReactNode {
    const options: IOptionProps[] = [
      { label: 'Class number: low to high', value: 'classNumber-asc' },
      { label: 'Class number: high to low', value: 'classNumber-desc' },
      { label: 'Subject: ascending', value: 'subject-asc' },
      { label: 'Subject: descending', value: 'subject-desc' },
      { label: 'Class name: ascending', value: 'title-asc' },
      { label: 'Class name: descending', value: 'title-desc' },
      { label: 'Instructor: ascending', value: 'instructorName-asc' },
      { label: 'Instructor: descending', value: 'instructorName-desc' },
      { label: 'Meeting days: A-Z', value: 'days-asc' },
      { label: 'Meeting days: Z-A', value: 'days-desc' },
      { label: 'Meeting time: AM-PM', value: 'time-asc' },
      { label: 'Meeting time: PM-AM', value: 'time-desc' },
      { label: 'Seats available: low to high', value: 'seatsAvailable-asc' },
      { label: 'Seats available: high to low', value: 'seatsAvailable-desc' },
      { label: 'Waitlist: low to high', value: 'seatsWaitlist-asc' },
      { label: 'Waitlist: high to low', value: 'seatsWaitlist-desc' },
    ];
    return (
      <div id='form-sort'>
        <Label htmlFor="sort by">Sort By</Label>
        <HTMLSelect
          value={this.props.sortBy}
          options={options}
          onChange={this.handleChangeOfSortBy}
          className="sort-by-select"
        />
      </div>
    );
  }

  private handleChangeOfSortBy(event: any): void {
    this.props.onChangeOfSortBy(event.target.value);
  }
}
