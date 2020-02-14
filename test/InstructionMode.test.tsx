import { classJson } from './ClassesJson';
import { InstructionMode } from '../src/public/js/InstructionMode';
import { IClass } from '../src/public/js/Class';

describe('Filter by Instruction Mode', () => {
  const classBioOnline = JSON.parse(JSON.stringify(classJson));
  const classBioCm = JSON.parse(JSON.stringify(classJson));
  const classBioClassroom = JSON.parse(JSON.stringify(classJson));
  const classBioFullyOnlineSync = JSON.parse(JSON.stringify(classJson));
  const classBioHybridSync = JSON.parse(JSON.stringify(classJson));
  const classBioHybridClassroom = JSON.parse(JSON.stringify(classJson));
  let classesBio: IClass[];
  let classes: IClass[];

  beforeEach(() => {
    classBioOnline.instructionMode = 'ol';
    classBioCm.instructionMode = 'cm';
    classBioClassroom.instructionMode = 'p';
    classBioFullyOnlineSync.instructionMode = 'fo';
    classBioHybridSync.instructionMode = 'ho';
    classBioHybridClassroom.instructionMode = 'hc';
    classesBio = [
      classBioOnline,
      classBioCm,
      classBioClassroom,
      classBioFullyOnlineSync,
      classBioHybridSync,
      classBioHybridClassroom,
    ];
  });

  describe('when a user searches for online classes', () => {
    it('should display classes that have Online instruction mode', () => {
      classes = InstructionMode.filter(classesBio, 'ol');
      expect(classes).toHaveLength(3);
      expect(classes[0].instructionMode).toEqual('ol');
      expect(classes[1].instructionMode).toEqual('cm');
      expect(classes[2].instructionMode).toEqual('fo');
    });

  });

  describe('when a user searches for hybrid classes', () => {
    it('should display classes that have Hybrid instruction mode', () => {
      classes = InstructionMode.filter(classesBio, 'ho');
      expect(classes).toHaveLength(2);
      expect(classes[0].instructionMode).toEqual('ho');
      expect(classes[1].instructionMode).toEqual('hc');
    });
  });

});