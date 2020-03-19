import Moment from 'moment';
import { IClass } from './Class';
import { IOptionProps } from '@blueprintjs/core';
import { GeCourseAttribute } from './GeCourseAttribute';

export function fetchData(url: string, callbackOnSuccess: (response: any) => void,
                          callbackOnFailure: (error: string) => void): void {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: any): any => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong during fetching data');
      }
    })
    .then(callbackOnSuccess)
    .catch(callbackOnFailure);
}

export function fetchWithArg(url: string, params: {}, callbackOnSuccess: (response: any) => void,
                             callbackOnFailure: (error: string) => void): void {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((res: any): any => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong during fetching data');
      }
    })
    .then(callbackOnSuccess)
    .catch(callbackOnFailure);
}

export function saveOrUpdateLocalStorage(key: string, value: string): void {
  if (isLocalStorageEmpty(key)) {
    localStorage.setItem(key, value);
  }
  if (doesLocalStorageHaveStaleValue(key, value)) {
    localStorage.setItem(key, value);
  }
}

export function isObjectEmpty(object: any): boolean {
  return (Object.keys(object).length === 0 && object.constructor === Object);
}

export function getDateIn12HourFormat(date: Date): string {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export function getDateIn24HourFormat(date: Date): string {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
}

export function compareStartTimes(userTime: string, classTime: string): boolean {
  if (isTimeEmpty(classTime)) {
    return true;
  }
  const userSelectedTime = Moment(userTime, 'h:mma');
  const classesTime = Moment(classTime, 'h:mma');
  return (userSelectedTime.isSameOrBefore(classesTime));
}

export function compareEndTimes(userTime: string, classTime: string) {
  if (isTimeEmpty(classTime)) {
    return true;
  }
  const userSelectedTime = Moment(userTime, 'h:mma');
  const classesTime = Moment(classTime, 'h:mma');
  return (userSelectedTime.isSameOrAfter(classesTime));
}

export function getCampusName(campusMachineName: string): string {
  if (campusMachineName === 'MAIN') {
    return 'San Bernardino';
  }
  if (campusMachineName === 'PALM') {
    return 'Palm Desert';
  }
  return '';
}

export function getNoOfAvailableSeats(classes: IClass): number {
  const availableSeats = classes.enrolledCapacity - classes.enrolledTotal;
  if (availableSeats > 0) {
    return availableSeats;
  }
  return 0;
}

export function getClassType(classes: IClass): string | null {
  if (classes.ssrComponent === 'LEC') {
    return 'Lecture';
  }
  if (classes.ssrComponent === 'LAB') {
    return 'Lab';
  }
  if (classes.ssrComponent === 'SEM') {
    return 'Seminar';
  }
  if (classes.ssrComponent === 'SUP') {
    return 'Supplemental';
  }
  if (classes.ssrComponent === 'ACT') {
    return 'Activity';
  }
  return null;
}

export function getClassStatus(classes: IClass): string {
  const availableSeats = classes.enrolledCapacity - classes.enrolledTotal;
  if (availableSeats > 1) {
    return 'Open';
  }
  if (isWaitlist(classes)) {
    return 'Waitlist';
  }
  return 'Closed';
}

export function getInstructionMode(classes: IClass): string {
  if (classes.instructionMode === 'P') {
    return 'Classroom';
  }
  if (classes.instructionMode === 'OL') {
    return 'Online';
  }
  if (classes.instructionMode === 'CM') {
    return 'Online, Coursematch';
  }
  if (classes.instructionMode === 'FO') {
    return 'Fully Online (AB 386)';
  }
  if (classes.instructionMode === 'HO') {
    return 'Hybrid';
  }
  if (classes.instructionMode === 'HC') {
    return 'Hybrid';
  }
  if (classes.instructionMode === 'OC') {
    return 'Off-Campus';
  }
  if (classes.instructionMode === 'TO') {
    return 'Televised (origination site)';
  }
  if (classes.instructionMode === 'TR') {
    return 'Televised (receiving site)';
  }
  if (classes.instructionMode === 'Z') {
    return 'Zero Unit Instruction';
  }
  return 'N/A';
}

function isTimeEmpty(classTime: string): boolean {
  return (classTime.length === 0);
}

function doesLocalStorageHaveStaleValue(key: string, value: string): boolean {
  return (localStorage.getItem(key) !== value);
}

function isLocalStorageEmpty(key: string): boolean {
  return (!localStorage.getItem(key));
}

export function getSessionCode(classes: IClass): string {
  if (classes.sessionCode === '10W') {
    return '10 weeks';
  }
  if (classes.sessionCode === '1') {
    return 'Regular';
  }
  if (classes.sessionCode === '6W1') {
    return '6 weeks 1';
  }
  if (classes.sessionCode === '6W2') {
    return '6 weeks 2';
  }
  if (classes.sessionCode === '3W1') {
    return '3 weeks 1';
  }
  return classes.sessionCode;
}

export function getDegreeType(classes: IClass): string {
  if (classes.degreeType === 'UGRD') {
    return 'Undergraduate';
  }
  if (classes.degreeType === 'PBAC') {
    return 'Graduate';
  }
  if (classes.degreeType === 'EXED') {
    return 'Open University Course';
  }
  return '';
}

export function getRoomNumber(classes: IClass): string {
  if (classes.buildingCode.length === 0 && classes.room.length === 0) {
    return 'TBD';
  }
  return `${classes.buildingCode} ${classes.room}`;
}

export function mergeAttributes(classes: IClass[]): IClass[] {
  const results: IClass[] = [];
  results.push(classes[0]);
  for (let _class = 1; _class < classes.length; _class++) {
    const size = results.length - 1;
    const prevClass = results[size];
    const currClass = classes[_class];
    if (isDuplicateClass(prevClass, currClass)) {
      results[size].courseAttr = combineAttr(prevClass, currClass);
      results[size].geCourseAttr += ', ' + currClass.geCourseAttr;
    } else {
      results.push(classes[_class]);
    }
  }
  return results;
}

function combineAttr(prevClass: IClass, currClass: IClass): string {
  let mergedAttr = '';
  const prevClassAttr = prevClass.courseAttr;
  const currClassAttr = currClass.courseAttr;
  if (prevClassAttr !== undefined && currClassAttr !== undefined) {
    mergedAttr = prevClassAttr.concat(', ', currClassAttr);
  }
  return mergedAttr;
}

function isDuplicateClass(prevClass: IClass, currClass: IClass): boolean {
  return (prevClass.classNumber === currClass.classNumber);
}
function sortBySubject(classes: IClass[]): IClass[] {
  return classes.sort((a, b) => {
    return a.subject.localeCompare(b.subject);
  });
}

export function sortByCatalogNo(classes: IClass[]): IClass[] {
  return classes.sort((a, b) => {
    return ((parseInt(a.catalogNo, 10) - parseInt(b.catalogNo, 10))
      || parseInt(a.classSection, 10) - parseInt(b.classSection, 10));
  });
}

export function sortClasses(classes: IClass[]): IClass[] {
  return sortBySubject(sortByCatalogNo(classes));
}

export function expandCourseAttribute(courseAttrAbbr: string): string {
  const results: string[] = [];
  const courseAttrArr = courseAttrAbbr.split(', ');
  const courseAttrExpanded = {
    ASTD: 'Asian Studies',
    CLST: 'Chicano(a)/Latino(a) Studies',
    CSLI: 'Service Learning',
    DES: 'GE Designation',
    EBK: 'eBook',
    ETHN: 'Ethnic Studies',
    GE: 'General Education',
    GSS: 'Gender and Sexuality Studies',
    LCCM: 'Low Cost Course Materials',
    LTAM: 'Latin American Studies',
    SA: 'Study Abroad',
    WSTD: 'Women\'s Studies',
    ZCCM: 'Zero Cost Course Materials',
  };
  for (const courseAttr of  courseAttrArr) {
    const fullCourseAttr = courseAttrExpanded[courseAttr];
    if (fullCourseAttr !== undefined) {
      if (!results.includes(fullCourseAttr)) {
        results.push(fullCourseAttr);
      }
    }
  }
  if (results.length === 0) {
    return '';
  }
  return results.join(', ');
}

export function parseCourseAttributes(classes: IClass[], geCourseAttrs: IOptionProps[]): IClass[] {
  const mergedClasses = mergeAttributes(classes);
  for (const _class of mergedClasses) {
    const expandedCourseAttr = expandCourseAttribute(_class.courseAttr);
    _class.courseAttr = expandedCourseAttr;
    _class.courseAttr = GeCourseAttribute.addGeAttrs(_class, geCourseAttrs);
  }
  return mergedClasses;
}

export function isWaitlist(classes: IClass): boolean {
  const inWaitlist = classes.waitlistTotal;
  const waitlistCapacity = classes.waitlistCapacity;
  return (
    classes.enrolledCapacity - classes.enrolledTotal <= 1
    && inWaitlist >= 0
    && waitlistCapacity - inWaitlist !== 0
    && waitlistCapacity !== 0
  );
}
