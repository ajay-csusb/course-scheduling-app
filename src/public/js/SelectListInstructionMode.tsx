import React from 'react';
import { Label, HTMLSelect, IOptionProps } from '@blueprintjs/core';
export interface ISelectListInstructionMode {
  instructionMode: string;
  onChangeOfInstructionMode: (event: React.FormEvent) => void;
}

export class SelectListInstructionMode extends React.Component<ISelectListInstructionMode, {}> {

  constructor(props: ISelectListInstructionMode) {
    super(props);
    this.handleChangeOfInstructionMode = this.handleChangeOfInstructionMode.bind(this);
  }

  public render(): React.ReactNode {
    const instructionMode: IOptionProps[] = [
      { label: 'All', value: 'all' },
      { label: 'Classroom', value: 'p' },
      { label: 'Online', value: 'ol' },
      { label: 'Hybrid', value: 'hc' },
    ];
    return (
      <React.Fragment>
        <Label>Instruction Mode</Label>
        <HTMLSelect
          value={this.props.instructionMode}
          options={instructionMode}
          onChange={this.handleChangeOfInstructionMode}
          className="select-instruction-mode"
        />
      </React.Fragment>
    );
  }

  private handleChangeOfInstructionMode(event: React.FormEvent): void {
    this.props.onChangeOfInstructionMode(event);
  }
}
