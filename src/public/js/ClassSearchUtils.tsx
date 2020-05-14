import Moment from 'moment';
import { IClass } from './Class';
import { IOptionProps } from '@blueprintjs/core';
import { GeCourseAttribute } from './GeCourseAttribute';
import { Utils } from './Utils';
import * as CourseAttributes from './CourseAttributes';
import * as React from 'react';

const searchURL = 'https://search.csusb.edu';
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

export function getClassStatus(classes: IClass): string {
  const classStatus: string = classes.enrollmentStatus;
  if (isWaitlist(classes)) {
    return 'Waitlist';
  }
  if (classStatus === 'Close') {
    return 'Closed';
  }
  return classStatus;
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
    return '10 Week';
  }
  if (classes.sessionCode === '1') {
    return 'Regular';
  }
  if (classes.sessionCode === '6W1') {
    return '6 Week 1';
  }
  if (classes.sessionCode === '6W2') {
    return '6 Week 2';
  }
  if (classes.sessionCode === '3W1') {
    return '3 Week 1';
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
  const buildingCode = classes.buildingCode;
  const roomNumber = classes.room;
  if (buildingCode.length === 0 && roomNumber.length === 0) {
    return 'TBD';
  }
  if (buildingCode === 'TBD') {
    return 'TBD';
  }
  if (buildingCode.trim().toLowerCase() === 'ol') {
    return classes.room.length !== 0 ? Utils.toCapitalizeCase(roomNumber.toLowerCase()) : 'TBD';
  }
  return `${buildingCode} ${roomNumber}`;
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
      if (currClass.courseAttrDescription.length !== 0) {
        results[size].courseAttrDescription += ', ' + currClass.courseAttrDescription;
      }
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

function sortByClassSection(a: IClass, b: IClass): number {
  return parseInt(a.classSection, 10) - parseInt(b.classSection, 10);
}

function normalizeCatalogNo(a: string, b: string): string[] {
  if (a.length !== 10) {
    a = a.padStart(10, '0');
  }
  if (b.length !== 10) {
    b = b.padStart(10, '0');
  }
  return [a, b];
}

export function sortByCatalogNo(classes: IClass[]): IClass[] {
  return classes.sort((a, b) => performSort(a, b));
}

function performSort(a: IClass, b: IClass): number {
    const [catalogA, catalogB] = normalizeCatalogNo(a.catalogNo, b.catalogNo);
    return (parseInt(a.catalogNo, 10) - parseInt(b.catalogNo, 10)
    || catalogA.localeCompare(catalogB)
    || sortByClassSection(a, b)
    );
}

export function sortClasses(classes: IClass[]): IClass[] {
  return sortBySubject(sortByCatalogNo(classes));
}

export function expandCourseAttribute(courseAttrAbbr: string): string {
  const results: string[] = [];
  const courseAttrArr = courseAttrAbbr.split(', ');
  const courseAttrExpanded = CourseAttributes.getValidCourseAttributes();
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
    setCourseAttribute(_class, geCourseAttrs);
  }
  return mergedClasses;
}

function setCourseAttribute(_class: IClass, geCourseAttrs: IOptionProps[]): void {
  _class.courseAttr =  expandCourseAttribute(_class.courseAttr);
  if (_class.courseAttr.includes('General Education')) {
    _class.courseAttr = GeCourseAttribute.addGeAttrs(_class, geCourseAttrs);
  }
  if (_class.courseAttr.includes('GE Designation')) {
    _class.courseAttr = GeCourseAttribute.addGeDesignationAttrs(_class);
  }
}

export function isWaitlist(classes: IClass): boolean {
  const inWaitlist = classes.waitlistTotal;
  const waitlistCapacity = classes.waitlistCapacity;
  return (
    classes.enrolledCapacity - classes.enrolledTotal < 1
    && inWaitlist >= 0
    && waitlistCapacity - inWaitlist > 0
    && waitlistCapacity > 0
  );
}

export function isValidTermRange(currentTerm: string, classTerm: string, currentMonth: number): boolean {
  const currentTermId = parseInt(currentTerm.charAt(currentTerm.length - 1), 10);
  const classTermId = parseInt(classTerm.charAt(classTerm.length - 1), 10);

  if (parseInt(currentTerm, 10) - parseInt(classTerm, 10) >= 6) {
    return false;
  }
  if (currentTermId === classTermId) {
    return true;
  }
  if (currentTermId < currentMonth) {
    return false;
  }
  if (currentTermId - currentMonth <= 5 && currentTermId - currentMonth > 0) {
    return true;
  }
  if (currentTermId === 2 &&  10 >= currentMonth  && currentMonth <= 12) {
    return true;
  }
  return false;
}

export function getInstructorMarkup(_class: IClass): JSX.Element | null {
  let profile = null;
  if (_class.instructorName.trim().length !== 0) {
    const instructorName = _class.instructorName;
    const instructorProfileURL = searchURL + _class.profile;
    profile = <>{instructorName}</>;
    if (_class.profile !== undefined && _class.profile.length !== 0) {
      profile = <a target="_blank" href={instructorProfileURL}>{instructorName}</a>;
    }
  }
  return profile;
}
