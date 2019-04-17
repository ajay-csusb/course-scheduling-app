import React from 'react';
import { Label } from '@blueprintjs/core';
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
    return (
      <Label>
        Instruction Mode
      <div className="bp3-select">
          <select onChange={this.handleChangeOfInstructionMode}>
            <option label="All" value="all" />
            <option label="Classroom" value="p" />
            <option label="Online" value="ol" />
            <option label="Online CourseMatch Instruction" value="cm" />
            <option label="Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)" value="fo" />
            <option label="Hybrid Online Asynchronous and Synchronous Instruction" value="ho" />
            <option label="Hybrid Classroom and Online Instruction" value="hc" />
            <option label="Off-Campus " value="oc" />
            <option label="Televised Instruction (origination site)" value="to" />
            <option label="Televised Instruction (receiving site)" value="tr" />
            <option label="Zero Unit Instruction " value="z" />
          </select>
        </div>
      </Label>
    );
  }

  private handleChangeOfInstructionMode(event: React.FormEvent): void {
    this.props.onChangeOfInstructionMode(event);
  }
}
