import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';
import { classJson} from './ClassesJson';
// tslint:disable:max-line-length

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

describe('Session code values', () => {
  describe('When Session code is 10W', () => {
    const classes10Weeks = JSON.parse(JSON.stringify(classJson));
    classes10Weeks.sessionCode = '10W';
    it('should return 10 weeks', () => {
      expect(ClassSearchUtils.getSessionCode(classes10Weeks)).toEqual('10 weeks');
    });
  });

  describe('When Session code is 12W', () => {
    const classes12Weeks = JSON.parse(JSON.stringify(classJson));
    classes12Weeks.sessionCode = '12W';
    it('should return 12 weeks', () => {
      expect(ClassSearchUtils.getSessionCode(classes12Weeks)).toEqual('12 weeks');
    });
  });

  describe('When Session code is MIN', () => {
    const classesMinWeeks = JSON.parse(JSON.stringify(classJson));
    classesMinWeeks.sessionCode = 'MIN';
    it('should return Mini', () => {
      expect(ClassSearchUtils.getSessionCode(classesMinWeeks)).toEqual('Mini');
    });
  });

  describe('When Session code is OSHER', () => {
    const classesOllWeeks = JSON.parse(JSON.stringify(classJson));
    classesOllWeeks.sessionCode = 'OLL';
    it('should return Osher', () => {
      expect(ClassSearchUtils.getSessionCode(classesOllWeeks)).toEqual('Osher');
    });
  });

  describe('When Session code is 1', () => {
    const classesRegWeeks = JSON.parse(JSON.stringify(classJson));
    classesRegWeeks.sessionCode = '1';
    it('should return Regular', () => {
      expect(ClassSearchUtils.getSessionCode(classesRegWeeks)).toEqual('Regular');
    });
  });

  describe('When Session code is RNS', () => {
    const classesRnsWeeks = JSON.parse(JSON.stringify(classJson));
    classesRnsWeeks.sessionCode = 'RNS';
    it('should return Regular Non Standard', () => {
      expect(ClassSearchUtils.getSessionCode(classesRnsWeeks)).toEqual('Regular Non Standard');
    });
  });

  describe('When Session code is SNS', () => {
    const classesSns = JSON.parse(JSON.stringify(classJson));
    classesSns.sessionCode = 'SNS';
    it('should return Self Non Standard', () => {
      expect(ClassSearchUtils.getSessionCode(classesSns)).toEqual('Self Non Standard');
    });
  });

  describe('When Session code is ES1', () => {
    const classesEs1 = JSON.parse(JSON.stringify(classJson));
    classesEs1.sessionCode = 'ESP1';
    it('should return ESP1', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs1)).toEqual('ESP1');
    });
  });

  describe('When Session code is ES1', () => {
    const classesEs1 = JSON.parse(JSON.stringify(classJson));
    classesEs1.sessionCode = 'ES1';
    it('should return ESP1', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs1)).toEqual('ESP1');
    });
  });

  describe('When Session code is ES2', () => {
    const classesEs2 = JSON.parse(JSON.stringify(classJson));
    classesEs2.sessionCode = 'ES2';
    it('should return ESP2', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs2)).toEqual('ESP2');
    });
  });

  describe('When Session code is ES3', () => {
    const classesEs3 = JSON.parse(JSON.stringify(classJson));
    classesEs3.sessionCode = 'ES3';
    it('should return ESP3', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs3)).toEqual('ESP3');
    });
  });

  describe('When Session code is ES4', () => {
    const classesEs4 = JSON.parse(JSON.stringify(classJson));
    classesEs4.sessionCode = 'ES4';
    it('should return ESP4', () => {
      expect(ClassSearchUtils.getSessionCode(classesEs4)).toEqual('ESP4');
    });
  });

  describe('When Session code is one of the code for 3 weeks', () => {
    describe('When Session code is 3W1', () => {
      it('should return 3 weeks', () => {
        const classes31Weeks = JSON.parse(JSON.stringify(classJson));
        classes31Weeks.sessionCode = '3W1';
        expect(ClassSearchUtils.getSessionCode(classes31Weeks)).toEqual('3 weeks');
      });
    });
    describe('When Session code is 3W2', () => {
      it('should return 3 weeks', () => {
        const classes32Weeks = JSON.parse(JSON.stringify(classJson));
        classes32Weeks.sessionCode = '3W2';
        expect(ClassSearchUtils.getSessionCode(classes32Weeks)).toEqual('3 weeks');
      });
    });
    describe('When Session code is 3W3', () => {
      it('should return 3 weeks', () => {
        const classes33Weeks = JSON.parse(JSON.stringify(classJson));
        classes33Weeks.sessionCode = '3W3';
        expect(ClassSearchUtils.getSessionCode(classes33Weeks)).toEqual('3 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 4 weeks', () => {
    describe('When Session code is 4W1', () => {
      it('should return 4 weeks', () => {
        const classes41Weeks = JSON.parse(JSON.stringify(classJson));
        classes41Weeks.sessionCode = '4W1';
        expect(ClassSearchUtils.getSessionCode(classes41Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W2', () => {
      it('should return 4 weeks', () => {
        const classes42Weeks = JSON.parse(JSON.stringify(classJson));
        classes42Weeks.sessionCode = '4W2';
        expect(ClassSearchUtils.getSessionCode(classes42Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W3', () => {
      it('should return 4 weeks', () => {
        const classes43Weeks = JSON.parse(JSON.stringify(classJson));
        classes43Weeks.sessionCode = '4W3';
        expect(ClassSearchUtils.getSessionCode(classes43Weeks)).toEqual('4 weeks');
      });
    });
    describe('When Session code is 4W4', () => {
      it('should return 4 weeks', () => {
        const classes44Weeks = JSON.parse(JSON.stringify(classJson));
        classes44Weeks.sessionCode = '4W4';
        expect(ClassSearchUtils.getSessionCode(classes44Weeks)).toEqual('4 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 6 weeks', () => {
    describe('When Session code is 6W1', () => {
      it('should return 6 weeks', () => {
        const classes61Weeks = JSON.parse(JSON.stringify(classJson));
        classes61Weeks.sessionCode = '6W1';
        expect(ClassSearchUtils.getSessionCode(classes61Weeks)).toEqual('6 weeks');
      });
    });
    describe('When Session code is 6W2', () => {
      it('should return 6 weeks', () => {
        const classes62Weeks = JSON.parse(JSON.stringify(classJson));
        classes62Weeks.sessionCode = '6W2';
        expect(ClassSearchUtils.getSessionCode(classes62Weeks)).toEqual('6 weeks');
      });
    });
    describe('When Session code is 6W3', () => {
      it('should return 6 weeks', () => {
        const classes63Weeks = JSON.parse(JSON.stringify(classJson));
        classes63Weeks.sessionCode = '6W3';
        expect(ClassSearchUtils.getSessionCode(classes63Weeks)).toEqual('6 weeks');
      });
    });
  });

  describe('When Session code is one of the code for 8 weeks', () => {
    describe('When Session code is 8W1', () => {
      it('should return 8 weeks', () => {
        const classes81Weeks = JSON.parse(JSON.stringify(classJson));
        classes81Weeks.sessionCode = '8W1';
        expect(ClassSearchUtils.getSessionCode(classes81Weeks)).toEqual('8 weeks');
      });
    });
    describe('When Session code is 8W2', () => {
      it('should return 8 weeks', () => {
        const classes82Weeks = JSON.parse(JSON.stringify(classJson));
        classes82Weeks.sessionCode = '8W2';
        expect(ClassSearchUtils.getSessionCode(classes82Weeks)).toEqual('8 weeks');
      });
    });
  });

  describe('When Session code is one of the code for Self Support', () => {
    describe('When Session code is SSD', () => {
      it('should return Self Support', () => {
        const classesSsd = JSON.parse(JSON.stringify(classJson));
        classesSsd.sessionCode = 'SSD';
        expect(ClassSearchUtils.getSessionCode(classesSsd)).toEqual('Self Support');
      });
    });

    describe('When Session code is SD1', () => {
      it('should return Self Support', () => {
        const classesSd1 = JSON.parse(JSON.stringify(classJson));
        classesSd1.sessionCode = 'SD1';
        expect(ClassSearchUtils.getSessionCode(classesSd1)).toEqual('Self Support');
      });
    });

    describe('When Session code is SD2', () => {
      it('should return Self Support', () => {
        const classesSd2 = JSON.parse(JSON.stringify(classJson));
        classesSd2.sessionCode = 'SD2';
        expect(ClassSearchUtils.getSessionCode(classesSd2)).toEqual('Self Support');
      });
    });
  });

});
