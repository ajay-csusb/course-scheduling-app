import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListGeClassesAttributesProps {
  geClassesAttribute: string;
  geClassesAttributes: IOptionProps[];
  onChangeOfGeClassesAttribute: (event: any) => void;
}

export class SelectListGeClassesAttributes extends React.Component<ISelectListGeClassesAttributesProps> {

  constructor(props: ISelectListGeClassesAttributesProps) {
    super(props);
    this.onChangeOfGeClassesAttribute = this.onChangeOfGeClassesAttribute.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Label htmlFor="ge-classes-attributes">GE Classes(Quarter)</Label>
        <HTMLSelect
          id="ge-classes-attributes"
          value={this.props.geClassesAttribute}
          className="select-ge-classes-attr"
          onChange={this.onChangeOfGeClassesAttribute}
          options={this.props.geClassesAttributes}
        />
      </React.Fragment>
    );
  }

  private onChangeOfGeClassesAttribute(event: React.FormEvent): void {
    this.props.onChangeOfGeClassesAttribute(event);
  }

}
