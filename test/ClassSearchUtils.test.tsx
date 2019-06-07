import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';
import { classJson} from './ClassesJson';
// tslint:disable:max-line-length

describe.skip('test localStorage create behavior', () => {
  test('localStorage is created if it is not present', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '123');
    expect(localStorage.setItem).toBeCalledWith('foo', '123');
  });

});

describe.skip('test localStorage update behavior', () => {
  // Todo mock implementation of localStorage.getItem(), then proceed to test assertions
  localStorage.mockImplementation('foo', '123');
  test('localStorage is not updated if value it has is same as than the one it receives', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '123');
    expect(localStorage.setItem).not.toBeCalledWith('foo', '123');
  });

  test('localStorage is updated if value it stores is older than the one it receives', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '456');
    expect(localStorage.setItem).toBeCalledWith('foo', '456');
  });
});

describe('Instruction mode values', () => {
  const classes = classJson;
  describe('when instruction mode is P', () => {
    it('should return Classroom', () => {
      expect(ClassSearchUtils.getInstructionMode(classes)).toEqual('Classroom');
    });
  });

  describe('when instruction mode is OL', () => {
    const onlineClasses = JSON.parse(JSON.stringify(classes));
    onlineClasses.instructionMode = 'OL';
    it('should return Online', () => {
      expect(ClassSearchUtils.getInstructionMode(onlineClasses)).toEqual('Online');
    });
  });

  describe('when instruction mode is CM', () => {
    const cmClasses = JSON.parse(JSON.stringify(classes));
    cmClasses.instructionMode = 'CM';
    it('should return Online CourseMatch Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(cmClasses)).toEqual('Online CourseMatch Instruction');
    });
  });

  describe('when instruction mode is FO', () => {
    const foClasses = JSON.parse(JSON.stringify(classes));
    foClasses.instructionMode = 'FO';
    it('should return Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)', () => {
      expect(ClassSearchUtils.getInstructionMode(foClasses)).toEqual('Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)');
    });
  });

  describe('when instruction mode is HO', () => {
    const hoClasses = JSON.parse(JSON.stringify(classes));
    hoClasses.instructionMode = 'HO';
    it('should return Hybrid Online Asynchronous and Synchronous Instruction ', () => {
      expect(ClassSearchUtils.getInstructionMode(hoClasses)).toEqual('Hybrid Online Asynchronous and Synchronous Instruction');
    });
  });

  describe('when instruction mode is HC', () => {
    const hcClasses = JSON.parse(JSON.stringify(classes));
    hcClasses.instructionMode = 'HC';
    it('should return Hybrid Classroom and Online Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(hcClasses)).toEqual('Hybrid Classroom and Online Instruction');
    });
  });

  describe('when instruction mode is OC', () => {
    const ocClasses = JSON.parse(JSON.stringify(classes));
    ocClasses.instructionMode = 'OC';
    it('should return Off-Campus', () => {
      expect(ClassSearchUtils.getInstructionMode(ocClasses)).toEqual('Off-Campus');
    });
  });

  describe('when instruction mode is TO', () => {
    const toClasses = JSON.parse(JSON.stringify(classes));
    toClasses.instructionMode = 'TO';
    it('should return Televised Instruction (origination site)', () => {
      expect(ClassSearchUtils.getInstructionMode(toClasses)).toEqual('Televised Instruction (origination site)');
    });
  });

  describe('when instruction mode is TR', () => {
    const trClasses = JSON.parse(JSON.stringify(classes));
    trClasses.instructionMode = 'TR';
    it('should return Televised Instruction (receiving site)', () => {
      expect(ClassSearchUtils.getInstructionMode(trClasses)).toEqual('Televised Instruction (receiving site)');
    });
  });

  describe('when instruction mode is Z', () => {
    const zClasses = JSON.parse(JSON.stringify(classes));
    zClasses.instructionMode = 'Z';
    it('should return Zero Unit Instruction', () => {
      expect(ClassSearchUtils.getInstructionMode(zClasses)).toEqual('Zero Unit Instruction');
    });
  });

});

describe('Instruction name value', () => {
  const classes = classJson;

  describe('when instruction name is not empty', () => {
    it('should return instructor name', () => {
      expect(ClassSearchUtils.getInstructorName(classes)).toEqual('Dyck, Harold');
    });
  });

  describe('when instruction name is empty', () => {
    const noInstructorClass = JSON.parse(JSON.stringify(classes));
    noInstructorClass.instructorName = ' ';
    it('should return N/A', () => {
      expect(ClassSearchUtils.getInstructorName(noInstructorClass)).toEqual('N/A');
    });
  });
});
