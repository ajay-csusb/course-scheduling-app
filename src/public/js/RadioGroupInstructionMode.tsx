import React from 'react';
import { RadioGroup, Radio } from '@blueprintjs/core';
export interface IRadioGroupInstructionMode {
  instructionMode: string;
  onChangeOfInstructionMode: (event: React.FormEvent) => void;
}

export class RadioGroupInstructionMode extends React.Component<IRadioGroupInstructionMode, {}> {

  constructor(props: IRadioGroupInstructionMode) {
    super(props);
    this.handleChangeOfInstructionMode = this.handleChangeOfInstructionMode.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <RadioGroup
        label="Instruction Mode"
        onChange={(event: React.FormEvent) => (this.handleChangeOfInstructionMode(event))}
        selectedValue={this.props.instructionMode}
      >
        <Radio label="All" value="all" className="all-instruction-mode" />
        <Radio label="Classroom" value="p" className="classroom" />
        <Radio label="Online" value="ol" className="online" />
        <Radio label="Online CourseMatch Instruction" value="cm" className="cm" />
        <Radio label="Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)" value="fo" className="online-auto" />
        <Radio label="Hybrid Online Asynchronous and Synchronous Instruction" value="ho" className="hybrid-online"/>
        <Radio label="Hybrid Classroom and Online Instruction" value="hc" className="hybrid-classroom" />
        <Radio label="Off-Campus " value="oc" className="off-campus" />
        <Radio label="Televised Instruction (origination site)" value="to" className="television-instruction-to" />
        <Radio label="Televised Instruction (receiving site)" value="tr" className="televised-instruction-tr" />
        <Radio label="Zero Unit Instruction " value="z" className="zero-unit" />
      </RadioGroup>
    );
  }

  private handleChangeOfInstructionMode(event: React.FormEvent): void {
    this.props.onChangeOfInstructionMode(event);
  }
}
