  import React from 'react';
  import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';

  export interface ISelectListCampusProps {
    campus: string;
    onChangeOfCampus: (event: React.FormEvent) => void;
  }
  export class SelectListCampus extends React.Component<ISelectListCampusProps, {}> {
    constructor(props: ISelectListCampusProps) {
      super(props);
      this.handleChangeOfCampus = this.handleChangeOfCampus.bind(this);
    }

    public render(): React.ReactNode {
      const campus: IOptionProps[] = [
        { label: 'Both', value: 'both', className: 'both'},
        { label: 'San Bernardino', value: 'san-bernardino', className: 'san-bernardino'},
        { label: 'Palm Desert', value: 'palm-desert', className: 'palm-desert'},
      ];
      return (
        <Label>
          Campus
          <HTMLSelect
            value={this.props.campus}
            options={campus}
            onChange={this.handleChangeOfCampus}
            className="campus-select"
          />
        </Label>
      );
    }

    private handleChangeOfCampus(event: React.FormEvent): void {
      this.props.onChangeOfCampus(event);
    }
  }
