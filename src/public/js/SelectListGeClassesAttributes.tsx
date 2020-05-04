import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';
import * as ClassSearch from './ClassSearch.d';
import { GeCourseAttribute } from './GeCourseAttribute';

export interface ISelectListGeClassesAttributesProps {
  currentTerm: string;
  geClassesAttribute: string;
  geClassesAttributes: IOptionProps[];
  onChangeOfGeClassesAttribute: (event: any) => void;
}

export class SelectListGeClassesAttributes extends React.Component<ISelectListGeClassesAttributesProps> {

  constructor(props: ISelectListGeClassesAttributesProps) {
    super(props);
    this.onChangeOfGeClassesAttribute = this.onChangeOfGeClassesAttribute.bind(this);
    this.getGeClassAttributeOptions = this.getGeClassAttributeOptions.bind(this);
  }

  public render(): React.ReactNode {
    const geClassesAttrs = this.getGeClassAttributeOptions();
    return (
      <React.Fragment>
        <Label htmlFor="ge-classes-attributes">GE Classes</Label>
        <HTMLSelect
          id="ge-classes-attributes"
          value={this.props.geClassesAttribute}
          className="select-ge-classes-attr"
          onChange={this.onChangeOfGeClassesAttribute}
          options={geClassesAttrs}
        />
      </React.Fragment>
    );
  }

  private onChangeOfGeClassesAttribute(event: React.FormEvent): void {
    this.props.onChangeOfGeClassesAttribute(event);
  }

  private getGeClassAttributeOptions(): IOptionProps[] {
    if (this.props.currentTerm === undefined) {
      return [];
    }
    return this.getDropdownOptions(this.props.currentTerm);
  }

  private getDropdownOptions(term: string): IOptionProps[] {
    const options: IOptionProps[] = this.props.geClassesAttributes;
    const termId: number = parseInt(term, 10);
    const noOption: IOptionProps = {
      value: '',
      label: 'All',
    };
    let semOptions: IOptionProps[] = [];
    const quarterOptions: IOptionProps[] = [noOption];
    for (const option of options) {
      if (option.label!.startsWith('GE-')) {
        quarterOptions.push(option);
      }
    }
    if (termId >= ClassSearch.app.settings.firstSemester) {
      semOptions = [noOption].concat(GeCourseAttribute.getCourseAttributesSemester());
      return semOptions;
    }
    return quarterOptions;
  }

}
