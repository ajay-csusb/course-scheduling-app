import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';
export interface ISelectListDegreeType {
  degreeType: string;
  onChangeOfDegreeType: (event: React.FormEvent) => void;
}

export class SelectListDegreeType extends React.Component<ISelectListDegreeType, {}> {

  constructor(props: ISelectListDegreeType) {
    super(props);
    this.handleChangeOfDegreeType = this.handleChangeOfDegreeType.bind(this);
  }

  public render(): React.ReactNode {
    const degreeType: IOptionProps[] = [
      { label: 'All', value: 'all'},
      { label: 'Undergraduate', value: 'UGRD'},
      { label: 'Graduate', value: 'PBAC'},
      { label: 'Open University Course', value: 'EXED'},
    ];
    return (
      <Label>
        Degree Type
        <HTMLSelect
          value={this.props.degreeType}
          options={degreeType}
          onChange={this.handleChangeOfDegreeType}
          className="select-degree-type"
        />
      </Label>
    );
  }

  private handleChangeOfDegreeType(event: React.FormEvent): void {
    this.props.onChangeOfDegreeType(event);
  }
}
