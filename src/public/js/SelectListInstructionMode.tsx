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
            <option label="All" value="all">All</option>
            <option label="Classroom" value="p">Classroom</option>
            <option label="Online" value="ol">Online</option>
            <option label="Online CourseMatch Instruction" value="cm">Online CourseMatch Instruction</option>
            <option label="Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)" value="fo">
              Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)
            </option>
            <option label="Hybrid Online Asynchronous and Synchronous Instruction" value="ho">
              Hybrid Online Asynchronous and Synchronous Instruction
            </option>
            <option label="Hybrid Classroom and Online Instruction" value="hc">
              Hybrid Classroom and Online Instruction
            </option>
            <option label="Off-Campus " value="oc">Off-Campus</option>
            <option label="Televised Instruction (origination site)" value="to">
              Televised Instruction (origination site)
            </option>
            <option label="Televised Instruction (receiving site)" value="tr">
              Televised Instruction (receiving site)
            </option>
            <option label="Zero Unit Instruction " value="z">Zero Unit Instruction </option>
          </select>
        </div>
      </Label>
    );
  }

  private handleChangeOfInstructionMode(event: React.FormEvent): void {
    this.props.onChangeOfInstructionMode(event);
  }
}
