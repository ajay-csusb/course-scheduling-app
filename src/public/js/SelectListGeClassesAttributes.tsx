import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';
import * as ClassSearch from './ClassSearch.d';

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
    let options: IOptionProps[] = this.props.geClassesAttributes;
    const termId: number = parseInt(term, 10);
    if (termId >= ClassSearch.app.settings.firstSemester) {
      options = [
        { label: 'All', value: '' },
        { label: 'GE-A1 Oral Communication', value: 'GE-A1' },
        { label: 'GE-A2 Written Communication', value: 'GE-A2' },
        { label: 'GE-A3 Critical Thinking', value: 'GE-A3' },
        { label: 'GE-B1 Physical Science', value: 'GE-B1' },
        { label: 'GE-B2 Life Science', value: 'GE-B2' },
        { label: 'GE-B3 Laboratory Activity', value: 'GE-B3' },
        { label: 'GE-B4 Mathematics/Quant. Reasoning', value: 'GE-B4' },
        { label: 'GE-B5 UD Scientific Inquiry & Quant.', value: 'GE-B5' },
        { label: 'GE-C1 Arts', value: 'GE-C1' },
        { label: 'GE-C2 Humanities', value: 'GE-C2' },
        { label: 'GE-C3 Additional C1 or C2 Course', value: 'GE-C3' },
        { label: 'GE-C4 UD Arts and Humanities', value: 'GE-C4' },
        { label: 'GE-D1 United States Government', value: 'GE-D1' },
        { label: 'GE-D2 United States History', value: 'GE-D2' },
        { label: 'GE-D3 Social Sciences Discipline', value: 'GE-D3' },
        { label: 'GE-D4 UD Social Sciences', value: 'GE-D4' },
        { label: 'GE-E First-Year Seminar', value: 'GE-E' },
      ];
    }
    return options;
  }

}
