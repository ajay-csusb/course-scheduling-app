import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

export interface ISelectListGeClassesAttributesProps {
  geClassesAttribute: string;
  geClassesAttributes: IOptionProps[];
  onChangeOfGeClassesAttributes: (event: any) => void;
}

export class SelectListGeClassesAttributes extends React.Component<ISelectListGeClassesAttributesProps> {

  constructor(props: ISelectListGeClassesAttributesProps) {
    super(props);
    this.onChangeOfGeClassesAttributes = this.onChangeOfGeClassesAttributes.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Label htmlFor="ge-classes-attributes">GE Classes</Label>
        <HTMLSelect
          id="ge-classes-attributes"
          value={this.props.geClassesAttribute}
          className="select-ge-classes-attr"
          onChange={this.onChangeOfGeClassesAttributes}
          options={this.props.geClassesAttributes}
        />
      </React.Fragment>
    );
  }

  private onChangeOfGeClassesAttributes(event: React.FormEvent): void {
    this.props.onChangeOfGeClassesAttributes(event);
  }

}
