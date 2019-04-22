  import React from 'react';
  import { Label } from '@blueprintjs/core';

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
      return (
        <Label>
          Campus
          <div className="bp3-select campus-select">
            <select onChange={this.handleChangeOfCampus}>
              <option label="Both" value="both" className="both" />
              <option label="San Bernardino" value="san-bernardino" className="san-bernardino" />
              <option label="Palm Desert" value="palm-desert" className="palm-desert"/>
            </select>
          </div>
      </Label>
      );
    }

    private handleChangeOfCampus(event: React.FormEvent): void {
      this.props.onChangeOfCampus(event);
    }
  }
