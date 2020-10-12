import { classJson } from './ClassesJson';
import { InstructionMode } from '../src/public/js/InstructionMode';
import { IClass } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';

describe('Filter by Instruction Mode', () => {
  classJson.buildingCode = 'OL';
  classJson.room = 'ONLINE';
  const classBioOnline: IClass = TestUtils.copyObject(classJson);
  const classBioCm: IClass = TestUtils.copyObject(classJson);
  const classBioClassroom: IClass = TestUtils.copyObject(classJson);
  const classBioFullyOnlineSync: IClass = TestUtils.copyObject(classJson);
  const classBioHybridSync: IClass = TestUtils.copyObject(classJson);
  const classBioHybridClassroom: IClass = TestUtils.copyObject(classJson);
  const classBioOnlineSync: IClass = TestUtils.copyObject(classJson);
  const classBioClassroomSync: IClass = TestUtils.copyObject(classJson);
  const classBioClassroomAsync: IClass = TestUtils.copyObject(classJson);
  let classesBio: IClass[];
  let classes: IClass[];

  beforeEach(() => {
    classBioOnline.instructionMode = 'OL';
    classBioCm.instructionMode = 'CM';
    classBioClassroom.instructionMode = 'P';
    classBioFullyOnlineSync.instructionMode = 'FO';
    classBioHybridSync.instructionMode = 'HO';
    classBioHybridSync.buildingCode = 'OL';
    classBioHybridSync.room = 'ONLINE';
    classBioHybridClassroom.instructionMode = 'HC';
    classBioOnlineSync.instructionMode = 'OS';
    classBioClassroomSync.instructionMode = 'CS';
    classBioClassroomAsync.instructionMode = 'CA';
    classesBio = [
      classBioOnline,
      classBioCm,
      classBioClassroom,
      classBioFullyOnlineSync,
      classBioHybridSync,
      classBioHybridClassroom,
      classBioOnlineSync,
      classBioClassroomSync,
      classBioClassroomAsync,
    ];
  });

  describe('when a user searches for online classes', () => {
    it('should display classes that have Online instruction mode', () => {
      classes = InstructionMode.filter(classesBio, 'ol');
      expect(classes).toHaveLength(5);
      expect(classes[0].instructionMode).toEqual('OL');
      expect(classes[1].instructionMode).toEqual('CM');
      expect(classes[2].instructionMode).toEqual('FO');
      expect(classes[3].instructionMode).toEqual('HO');
      expect(classes[4].instructionMode).toEqual('OS');
    });
  });

  describe('when a user searches for hybrid classes', () => {
    it('should display classes that have Hybrid instruction mode', () => {
      classes = InstructionMode.filter(classesBio, 'hc');
      expect(classes).toHaveLength(3);
      expect(classes[0].instructionMode).toEqual('HC');
      expect(classes[1].instructionMode).toEqual('CS');
      expect(classes[2].instructionMode).toEqual('CA');
    });
  });

  describe('when a user searches for in-person classes', () => {
    it('should display classes that have Classroom instruction mode', () => {
      classes = InstructionMode.filter(classesBio, 'p');
      expect(classes).toHaveLength(1);
      expect(classes[0].instructionMode).toEqual('P');
    });
  });
});
