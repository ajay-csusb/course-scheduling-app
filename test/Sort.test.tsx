import * as Sort from '../src/public/js/Sort';
import { classJson } from './ClassesJson';
import { TestUtils } from './TestUtils';

describe('sorting classes', () => {
  let bioClass;
  let acctClass;
  beforeEach(() => {
    acctClass = TestUtils.copyObject(classJson);
    acctClass.subject = 'ACCT';
    acctClass.instructorName = 'Doe';
    acctClass.classSection = '02';
    acctClass.classNumber = 200;
    acctClass.campus = 'MAIN';
    acctClass.instructionMode = 'OL';
    bioClass = TestUtils.copyObject(classJson);
    bioClass.subject = 'BIOL';
    bioClass.instructorName = 'John';
    bioClass.classSection = '01';
    bioClass.classNumber = 100;
    bioClass.campus = 'PALM';
    bioClass.instructionMode = 'P';
  });

  describe('sort by string', () => {
    test('default sort by string behavior', () => {
      const results = Sort.sortByString([bioClass, acctClass]);
      expect(results[0].subject).toEqual('ACCT');
      expect(results[1].subject).toEqual('BIOL');
    });

    test('sort by string in descending format', () => {
      const results = Sort.sortByString([bioClass, acctClass], 'desc');
      expect(results[0].subject).toEqual('BIOL');
      expect(results[1].subject).toEqual('ACCT');
    });

    test('sort by string using instructor name as the key', () => {
      const results = Sort.sortByString([bioClass, acctClass], 'asc', 'instructorName');
      expect(results[0].instructorName).toEqual('Doe');
      expect(results[1].instructorName).toEqual('John');
    });
  });

  describe('sort by int', () => {
    test('default sorting behavior', () => {
      const sortedClasses = Sort.sortByInt([acctClass, bioClass]);
      expect(sortedClasses[0].classSection).toEqual('01');
      expect(sortedClasses[1].classSection).toEqual('02');
    });

    test('sort in descending order', () => {
      const descSortedClasses = Sort.sortByInt([acctClass, bioClass], 'desc');
      expect(descSortedClasses[0].classSection).toEqual('02');
      expect(descSortedClasses[1].classSection).toEqual('01');
    });

    test('sort by class number', () => {
      const classNumberSortClasses = Sort.sortByInt([acctClass, bioClass], 'asc', 'classNumber'); 
      expect(classNumberSortClasses[0].classNumber).toEqual(100);
      expect(classNumberSortClasses[1].classNumber).toEqual(200);
    });
  });

  describe('sort campus', () => {
    test('default sorting behavior', () => {
      const sortByCampusResults = Sort.sortByCampus([acctClass, bioClass]);
      expect(sortByCampusResults[0].campus).toEqual('PALM');
      expect(sortByCampusResults[1].campus).toEqual('MAIN');
    });

    test('descending sort', () => {
      const sortByCampusResults = Sort.sortByCampus([acctClass, bioClass], 'des');
      expect(sortByCampusResults[0].campus).toEqual('MAIN');
      expect(sortByCampusResults[1].campus).toEqual('PALM');
    });
  });

  describe('sort by instruction mode', () => {
    test('default behavior', () => {
      const acctClassHybrid = TestUtils.copyObject(classJson);
      acctClassHybrid.instructionMode = 'HC';
      const acctClassCourseMatch = TestUtils.copyObject(classJson);
      acctClassCourseMatch.instructionMode = 'CM';
      const sortByInstructionMode = Sort.sortByInstructionMode([acctClassHybrid, acctClassCourseMatch, acctClass, bioClass]);
      // P maps to classroom
      expect(sortByInstructionMode[0].instructionMode).toEqual('P');
      // HC maps to Hybrid
      expect(sortByInstructionMode[1].instructionMode).toEqual('HC');
      // OL maps to Online
      expect(sortByInstructionMode[2].instructionMode).toEqual('OL');
      // OL maps to Online, Coursematch
      expect(sortByInstructionMode[3].instructionMode).toEqual('CM');
    });
    test('descending sort', () => {
      const acctClassHybrid = TestUtils.copyObject(classJson);
      acctClassHybrid.instructionMode = 'HC';
      const acctClassCourseMatch = TestUtils.copyObject(classJson);
      acctClassCourseMatch.instructionMode = 'CM';
      const sortByInstructionMode = Sort.sortByInstructionMode([acctClassHybrid, acctClassCourseMatch, acctClass, bioClass], 'desc');
      expect(sortByInstructionMode[0].instructionMode).toEqual('CM');
      expect(sortByInstructionMode[1].instructionMode).toEqual('OL');
      expect(sortByInstructionMode[2].instructionMode).toEqual('HC');
      expect(sortByInstructionMode[3].instructionMode).toEqual('P');
    });
  });

  describe('sort by meeting time', () => {
    let acctClassBeforeNoon;
    let acctClassAfterNoon;
    let acctClassWithNoStartTime;
    beforeEach(() => {
      acctClassBeforeNoon = TestUtils.copyObject(classJson);
      acctClassBeforeNoon.classStartTime = '08:00 AM';
      acctClassAfterNoon = TestUtils.copyObject(classJson);
      acctClassAfterNoon.classStartTime = '06:00 PM';
      acctClassWithNoStartTime = TestUtils.copyObject(classJson);
      acctClassWithNoStartTime.classStartTime = '';
    });
    test('default behavior', () => {
      const sortClassesByMeetingTime = Sort.sortByMeetingTime([acctClassWithNoStartTime, acctClassAfterNoon, acctClassBeforeNoon]);
      expect(sortClassesByMeetingTime[0].classStartTime).toEqual('08:00 AM');
      expect(sortClassesByMeetingTime[1].classStartTime).toEqual('06:00 PM');
      expect(sortClassesByMeetingTime[2].classStartTime).toEqual('');
    });

    test('default behavior with times before noon', () => {
      const acctClassBeforeNoon2 = TestUtils.copyObject(acctClassBeforeNoon);
      acctClassBeforeNoon2.classStartTime = '10:00 AM';
      const sortClassesByMeetingTime = Sort.sortByMeetingTime([acctClassWithNoStartTime, acctClassBeforeNoon, acctClassBeforeNoon2]);
      expect(sortClassesByMeetingTime[0].classStartTime).toEqual('08:00 AM');
      expect(sortClassesByMeetingTime[1].classStartTime).toEqual('10:00 AM');
      expect(sortClassesByMeetingTime[2].classStartTime).toEqual('');
    });

    test('descending sort', () => {
      const sortClassesByMeetingTime = Sort.sortByMeetingTime([acctClassWithNoStartTime, acctClassBeforeNoon, acctClassAfterNoon], 'desc');
      expect(sortClassesByMeetingTime[0].classStartTime).toEqual('06:00 PM');
      expect(sortClassesByMeetingTime[1].classStartTime).toEqual('08:00 AM');
      expect(sortClassesByMeetingTime[2].classStartTime).toEqual('');
    });

  });

  describe('sort by meeting day', () => {
    const copyOfClassJson = TestUtils.copyObject(classJson);
    copyOfClassJson.mon = 'N';
    copyOfClassJson.wed = 'N';
    const acctClassMon = TestUtils.copyObject(copyOfClassJson);
    const acctClassTue = TestUtils.copyObject(copyOfClassJson);
    const acctClassWed = TestUtils.copyObject(copyOfClassJson);
    const acctClassThur = TestUtils.copyObject(copyOfClassJson);
    const acctClassFri = TestUtils.copyObject(copyOfClassJson);
    const acctClassSat = TestUtils.copyObject(copyOfClassJson);
    const acctClassSun = TestUtils.copyObject(copyOfClassJson);
    let allClasses = [];
    beforeEach(() => {
      acctClassMon.mon = 'Y';
      acctClassTue.tues = 'Y';
      acctClassWed.wed = 'Y';
      acctClassThur.thurs = 'Y';
      acctClassFri.fri = 'Y';
      acctClassSat.sat = 'Y';
      acctClassSun.sun = 'Y';
      allClasses = [
        acctClassSun,
        acctClassSat,
        acctClassFri,
        acctClassWed,
        acctClassMon,
        acctClassThur,
        acctClassTue,
      ];
    });
    test('default sorting behavior', () => {
      const sortClassesByMeetingDates = Sort.sortByMeetingDays([acctClassMon, acctClassTue]);
      expect(sortClassesByMeetingDates[0].mon).toEqual('Y');
      expect(sortClassesByMeetingDates[1].tues).toEqual('Y');
    });

    test('sort by descending order', () => {
      const sortClassesByMeetingDates = Sort.sortByMeetingDays([acctClassMon, acctClassTue], 'des');
      expect(sortClassesByMeetingDates[0].tues).toEqual('Y');
      expect(sortClassesByMeetingDates[1].mon).toEqual('Y');
    });

    test('complex sorting behavior', () => {
      const sortClassesByMeetingDates = Sort.sortByMeetingDays(allClasses);
      expect(sortClassesByMeetingDates[0].fri).toEqual('Y');
      expect(sortClassesByMeetingDates[1].mon).toEqual('Y');
      expect(sortClassesByMeetingDates[2].sat).toEqual('Y');
      expect(sortClassesByMeetingDates[3].sun).toEqual('Y');
      expect(sortClassesByMeetingDates[4].thurs).toEqual('Y');
      expect(sortClassesByMeetingDates[5].tues).toEqual('Y');
      expect(sortClassesByMeetingDates[6].wed).toEqual('Y');
    });

    test('complex sorting behavior in reverse order', () => {
      const sortClassesByMeetingDates = Sort.sortByMeetingDays(allClasses, 'des');
      expect(sortClassesByMeetingDates[0].wed).toEqual('Y');
      expect(sortClassesByMeetingDates[1].tues).toEqual('Y');
      expect(sortClassesByMeetingDates[2].thurs).toEqual('Y');
      expect(sortClassesByMeetingDates[3].sun).toEqual('Y');
      expect(sortClassesByMeetingDates[4].sat).toEqual('Y');
      expect(sortClassesByMeetingDates[5].mon).toEqual('Y');
      expect(sortClassesByMeetingDates[6].fri).toEqual('Y');
    });
  });

  describe('sort by seats available', () => {
    const acctClassSa = TestUtils.copyObject(classJson);
    const bioClassSa = TestUtils.copyObject(classJson);
    beforeEach(() => {
      acctClassSa.subject = 'ACCT';
      acctClassSa.enrolledTotal = 20;
      acctClassSa.enrolledCapacity = 30;
      bioClassSa.subject = 'BIOL';
      bioClassSa.enrolledTotal = 2;
      bioClassSa.enrolledCapacity = 30;
    });
    test('default sorting behavior', () => {
      const sortClassesBySeatsAvailable = Sort.sortBySeatsAvailable([acctClassSa, bioClassSa]);
      // Sort by no of seats available, not by no of seats occupied
      expect(sortClassesBySeatsAvailable[0].enrolledTotal).toEqual(20);
      expect(sortClassesBySeatsAvailable[1].enrolledTotal).toEqual(2);
    });

    test('descending sort', () => {
      const sortClassesBySeatsAvailable = Sort.sortBySeatsAvailable([acctClassSa, bioClassSa], 'des');
      expect(sortClassesBySeatsAvailable[0].enrolledTotal).toEqual(2);
      expect(sortClassesBySeatsAvailable[1].enrolledTotal).toEqual(20);
    });
  });

  describe('sort by waitlist capacity', () => {
    const acctClassWc = TestUtils.copyObject(classJson);
    const bioClassWc = TestUtils.copyObject(classJson);
    beforeEach(() => {
      acctClassWc.subject = 'ACCT';
      acctClassWc.waitlistTotal = 5;
      acctClassWc.waitlistCapacity = 30;
      bioClassWc.subject = 'BIOL';
      bioClassWc.waitlistTotal = 15;
      bioClassWc.waitlistCapacity = 30;
    });
    test('default sorting behavior', () => {
      const sortClassesByWaitlistCapacity = Sort.sortBySeatsAvailableInWaitlist([acctClassWc, bioClassWc]);
      // Sort by no of seats available in waitlist, not number of seats in waitlist
      expect(sortClassesByWaitlistCapacity[0].waitlistTotal).toEqual(15);
      expect(sortClassesByWaitlistCapacity[1].waitlistTotal).toEqual(5);
    });

    test('descending sort', () => {
      const sortClassesByWaitlistCapacity = Sort.sortBySeatsAvailableInWaitlist([acctClassWc, bioClassWc], 'des');
      expect(sortClassesByWaitlistCapacity[0].waitlistTotal).toEqual(5);
      expect(sortClassesByWaitlistCapacity[1].waitlistTotal).toEqual(15);
    });
  });

});
