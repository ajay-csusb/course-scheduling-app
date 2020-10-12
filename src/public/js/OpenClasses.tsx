import React from 'react';
import { Switch, Alignment } from '@blueprintjs/core';

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
    const innerLabelText = this.props.openClasses ? 'On' : 'Off';

    return (
      <Switch
        checked={this.props.openClasses}
        label="Open Classes"
        innerLabel={innerLabelText}
        className="open-classes"
        onChange={this.onChangeOfOpenClasses}
        large={true}
        alignIndicator={Alignment.RIGHT}
      />
    );
  }

  private onChangeOfOpenClasses(event: React.FormEvent): void {
    this.props.onChangeOfOpenClasses(event);
  }
}
