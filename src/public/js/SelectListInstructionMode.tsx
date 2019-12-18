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
      { label: 'All', value: 'all'},
      { label: 'Classroom', value: 'p'},
      { label: 'Online', value: 'ol'},
      { label: 'Online CourseMatch Instruction', value: 'cm'},
      { label: 'Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)', value: 'fo'},
      { label: 'Hybrid Online Asynchronous and Synchronous Instruction', value: 'ho'},
      { label: 'Hybrid Classroom and Online Instruction', value: 'hc'},
      { label: 'Off-Campus ', value: 'oc'},
      { label: 'Televised Instruction (origination site)', value: 'to'},
      { label: 'Televised Instruction (receiving site)', value: 'tr'},
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
