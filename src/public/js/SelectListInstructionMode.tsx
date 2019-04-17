import React from 'react';
import { ControlGroup } from '@blueprintjs/core';
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
      <ControlGroup>
      <label>Instruction Mode:</label>
      <div className="bp3-select">
        <select onChange={this.handleChangeOfInstructionMode}>
          <option label="All" value="all" className="all-instruction-mode" />
          <option label="Classroom" value="p" className="classroom" />
          <option label="Online" value="ol" className="online" />
          <option label="Online CourseMatch Instruction" value="cm" className="cm" />
          <option label="Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)" value="fo" className="online-auto" />
          <option label="Hybrid Online Asynchronous and Synchronous Instruction" value="ho" className="hybrid-online" />
          <option label="Hybrid Classroom and Online Instruction" value="hc" className="hybrid-classroom" />
          <option label="Off-Campus " value="oc" className="off-campus" />
          <option label="Televised Instruction (origination site)" value="to" className="television-instruction-to" />
          <option label="Televised Instruction (receiving site)" value="tr" className="televised-instruction-tr" />
          <option label="Zero Unit Instruction " value="z" className="zero-unit" />
        </select>
        </div>
      </ControlGroup>
    );
  }

  private handleChangeOfInstructionMode(event: React.FormEvent): void {
    this.props.onChangeOfInstructionMode(event);
  }
}
