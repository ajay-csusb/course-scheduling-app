import React from 'react';
import { Label, IOptionProps, HTMLSelect } from '@blueprintjs/core';
export interface ISelectListQuarterProps {
    term: IOptionProps[];
    onChangeOfTerm: (event: React.FormEvent) => void;
}

export class SelectListQuarter extends React.Component<ISelectListQuarterProps, {}> {

  constructor(props: ISelectListQuarterProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <Label>
        Term
        <HTMLSelect
          className="select-term"
          onChange={this.props.onChangeOfTerm}
          options={this.props.term}
        />
      </Label>
    );
  }

}
