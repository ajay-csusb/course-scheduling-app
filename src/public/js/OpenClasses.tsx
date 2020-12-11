import React from 'react';
import { Switch, Alignment, FormGroup } from '@blueprintjs/core';

export interface IOpenClassesProps {
  openClasses: boolean;
  onChangeOfOpenClasses: (event: any) => void;
}

export class OpenClasses extends React.Component<IOpenClassesProps> {
  constructor(props: IOpenClassesProps) {
    super(props);
    this.onChangeOfOpenClasses = this.onChangeOfOpenClasses.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <>
        <div className="label">Open Classes</div>
        <div id="open-classes-filter">
          <FormGroup labelFor="open-classes">
            <Switch
              checked={this.props.openClasses}
              className="open-classes"
              onChange={this.onChangeOfOpenClasses}
              large={true}
              alignIndicator={Alignment.RIGHT}
            />
          </FormGroup>
        </div>
      </>
    );
  }

  private onChangeOfOpenClasses(event: React.FormEvent): void {
    this.props.onChangeOfOpenClasses(event);
  }
}
