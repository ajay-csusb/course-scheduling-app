import { IClass } from './Class';

export class InstructionMode {
  private static _classes: IClass[];

  public static filter(classes: IClass[], instructionMode: string): IClass[] {
    InstructionMode._classes = classes;
    if (instructionMode.toLowerCase() === 'ol') {
      return InstructionMode.filterByOnlineClasses();
    }
    if (instructionMode.toLowerCase() === 'hc') {
      return InstructionMode.filterByHybridClasses();
    }
    if (instructionMode.toLowerCase() === 'p') {
      return InstructionMode.filterByInPersonClasses();
    }
    return classes;
  }

  private static filterByOnlineClasses(): IClass[] {
    const results: IClass[] = [];
    InstructionMode._classes.forEach((_class: IClass) => {
      if (_class.room.length !== 0 && _class.room !== 'ONLINE') {
        return;
      }
      if (_class.buildingCode.length !== 0 && _class.buildingCode !== 'OL') {
        return;
      }
      if (_class.instructionMode.toLowerCase() === 'ol') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'cm') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'fo') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'ho') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'os') {
        results.push(_class);
      }
    });
    return results;
  }

  private static filterByHybridClasses(): IClass[] {
    const results: IClass[] = [];
    InstructionMode._classes.forEach((_class: IClass) => {
      if (_class.instructionMode.toLowerCase() === 'hc') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'cs') {
        results.push(_class);
      }
      if (_class.instructionMode.toLowerCase() === 'ca') {
        results.push(_class);
      }
    });
    return results;
  }

  private static filterByInPersonClasses(): IClass[] {
    const results: IClass[] = [];
    InstructionMode._classes.forEach((_class: IClass) => {
      if (_class.instructionMode.toLowerCase() === 'p') {
        results.push(_class);
      }
    });
    return results;
  }
}
