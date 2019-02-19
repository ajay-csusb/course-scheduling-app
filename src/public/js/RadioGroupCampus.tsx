  import React from 'react';
  import { RadioGroup, Radio } from '@blueprintjs/core';

  export interface IRadioGroupCampusProps {
    campus: string;
    onChangeOfCampus: (event: React.FormEvent) => void;
  }
  export class RadioGroupCampus extends React.Component<IRadioGroupCampusProps, {}> {
    constructor(props: IRadioGroupCampusProps) {
      super(props);
      this.handleChangeOfCampus = this.handleChangeOfCampus.bind(this);
    }

    public render(): React.ReactNode {
      return (
        <RadioGroup
          label="Campus"
          inline={true}
          onChange={(event: React.FormEvent) => (this.handleChangeOfCampus(event))}
          selectedValue={this.props.campus}
        >
          <Radio label="Both" value="both" className="both" />
          <Radio label="San Bernardino" value="san-bernardino" className="san-bernardino" />
          <Radio label="Palm Desert" value="palm-desert" className="palm-desert" />
        </RadioGroup>
      );
    }

    private handleChangeOfCampus(event: React.FormEvent): void {
      this.props.onChangeOfCampus(event);
    }
  }
