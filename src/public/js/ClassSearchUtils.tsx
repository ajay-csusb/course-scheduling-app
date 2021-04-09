import Moment from 'moment';
import { IClass } from './Class';
import { IOptionProps } from '@blueprintjs/core';
import { GeCourseAttribute } from './GeCourseAttribute';
import { Utils } from './Utils';
import * as CourseAttributes from './CourseAttributes';
import * as React from 'react';
import { Textbook } from './Textbook';
import * as Watchdog from './Watchdog';
import { app } from './ClassSearch.d';
import * as _ from 'lodash';

const searchURL = 'https://search.csusb.edu';

export function fetchData(
  callbackOnSuccess: (response: any) => void,
  callbackOnFailure: (error: string) => void
): void {
  const proxyUrl = getProxyUrl('dropdown');
  fetch(proxyUrl, {
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

export function fetchWithArg(
  url: string,
  params: {},
  callbackOnSuccess: (response: any) => void,
  callbackOnFailure: (error: string) => void
): void {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
  return Object.keys(object).length === 0 && object.constructor === Object;
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
  return userSelectedTime.isSameOrBefore(classesTime);
}

export function compareEndTimes(userTime: string, classTime: string) {
  if (isTimeEmpty(classTime)) {
    return true;
  }
  const userSelectedTime = Moment(userTime, 'h:mma');
  const classesTime = Moment(classTime, 'h:mma');
  return userSelectedTime.isSameOrAfter(classesTime);
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
  if (classes.instructionMode === 'OS') {
    return 'Online Synchronous';
  }
  if (classes.instructionMode === 'CA') {
    return 'Hybrid Classroom/face-to-face plus asynchronous online instruction';
  }
  if (classes.instructionMode === 'CS') {
    return 'Hybrid Classroom/face-to-face plus synchronous online instruction';
  }
  return 'N/A';
}

function isTimeEmpty(classTime: string): boolean {
  return classTime.length === 0;
}

function doesLocalStorageHaveStaleValue(key: string, value: string): boolean {
  return localStorage.getItem(key) !== value;
}

function isLocalStorageEmpty(key: string): boolean {
  return !localStorage.getItem(key);
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
  const buildingCodeList = classes.buildingCode.split(', ');
  const roomNumberList = classes.room.split(', ');

  if (buildingCode.length === 0 && roomNumber.length === 0) {
    return 'TBD';
  }
  if (buildingCode === 'TBD') {
    return 'TBD';
  }
  if (buildingCode.trim().toLowerCase() === 'ol') {
    return classes.room.length !== 0 ? Utils.toCapitalizeCase(roomNumber.toLowerCase()) : 'TBD';
  }
  if (buildingCodeList.length !== 1 && roomNumberList.length !== 1) {
    const buildingRoomCombined = _.zip(buildingCodeList, roomNumberList);
    let buildingAndRoom = '';

    buildingRoomCombined.forEach(_class => {
      if (buildingAndRoom.includes('Online')) {
        return;
      } else if (_class[1] === 'ONLINE') {
        buildingAndRoom += `, Online`;
      } else {
        buildingAndRoom += `, ${_class[0]} ${_class[1]}`;
      }
    });

    return _.trim(buildingAndRoom, ', ');
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
  return (
    prevClass.classNumber === currClass.classNumber &&
    classHasSameStartAndEndTimes(prevClass, currClass) &&
    classHasSameMeetingDays(prevClass, currClass)
  );
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
  return (
    parseInt(a.catalogNo, 10) - parseInt(b.catalogNo, 10) ||
    catalogA.localeCompare(catalogB) ||
    sortByClassSection(a, b)
  );
}

export function sortClasses(classes: IClass[]): IClass[] {
  return sortBySubject(sortByCatalogNo(classes));
}

export function expandCourseAttribute(courseAttrAbbr: string): string {
  const results: string[] = [];
  const courseAttrArr = courseAttrAbbr.split(',').map(x => x.trim());
  const courseAttrExpanded = CourseAttributes.getValidCourseAttributes();
  for (const courseAttr of courseAttrArr) {
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
  _class.courseAttr = expandCourseAttribute(_class.courseAttr);
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
    classes.enrolledCapacity - classes.enrolledTotal < 1 &&
    inWaitlist >= 0 &&
    waitlistCapacity - inWaitlist > 0 &&
    waitlistCapacity > 0
  );
}

export function isValidTermRange(currentTerm: string, classTerm: string): boolean {
  const fullCurrentTermId = parseInt(currentTerm, 10);
  const fullClassTermId = parseInt(classTerm, 10);
  if (fullClassTermId >= fullCurrentTermId) {
    return true;
  }
  if (fullCurrentTermId - fullClassTermId >= 6) {
    return false;
  }
  return true;
}

export function getInstructorMarkup(_class: IClass): JSX.Element | null {
  let profile = null;
  if (_class.instructorName.trim() !== 'TBD') {
    const instructorName = _class.instructorName;
    const instructorProfileURL = searchURL + _class.profile;
    profile = <>{instructorName}</>;
    if (_class.profile !== undefined && _class.profile.length !== 0) {
      profile = (
        <a target="_blank" href={instructorProfileURL}>
          {instructorName}
        </a>
      );
    }
  }
  return profile;
}

export function getNoOfAvailableSeatsInWaitlist(_class: IClass): number {
  return _class.waitlistCapacity - _class.waitlistTotal < 0 ? 0 : _class.waitlistCapacity - _class.waitlistTotal;
}

export function getTextbookUrl(_class: IClass): string {
  const term: number = parseInt(_class.quarter, 10);
  const subject: string = _class.subject;
  const catalogNo: string = _class.catalogNo;
  const section: string = _class.classSection;
  const campus: string = _class.campus;
  const textbook = new Textbook(term, subject, catalogNo, section, campus);

  return textbook.link();
}

export function exportToExcelPost(classes: IClass[]): Promise<Blob> {
  const url = Utils.isProd() ? app.settings.excelUrl : app.settings.excelUrlDev;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(classes),
  })
    .then((res: any) => {
      if (res.ok) {
        return res.blob();
      }
      Watchdog.log(res);
    })
    .catch((err: any) => {
      Watchdog.log(err);
      return err;
    });
}

export function formatSubjectTopic(topic: string): string {
  const topicLowercase = topic.toLowerCase();
  // Special case for PHIL 3001
  if (topicLowercase === 'truth, lies and bs') {
    return ': Truth, Lies and Bullshit';
  }
  return topicLowercase.trim().length !== 0 ? `: ${Utils.toCapitalizeCase(topicLowercase)}` : '';
}

function classHasSameStartAndEndTimes(class1: IClass, class2: IClass): boolean {
  return class1.classStartTime === class2.classStartTime && class1.classEndTime === class2.classEndTime;
}

function classHasSameMeetingDays(class1: IClass, class2: IClass): boolean {
  return _.isEqual(getAllMeetingDays(class1), getAllMeetingDays(class2));
}

function getAllMeetingDays(classes: IClass) {
  const meetingDaysClass: string[] = [];
  for (const [key, value] of Object.entries(classes)) {
    if (value === 'Y') {
      meetingDaysClass.push(key);
    }
  }
  return meetingDaysClass;
}

export function getDuplicateClasses(classes: IClass[]): {} {
  const result: {} = {};
  const classNumbers: Map<number, number> = new Map();
  classes.forEach((_class: IClass) => {
    const cn = _class.classNumber;
    if (classNumbers.has(cn)) {
      const val = classNumbers.get(cn)!;
      classNumbers.set(cn, val + 1);
    } else {
      classNumbers.set(cn, 1);
    }
  });
  classes.forEach((_class: IClass) => {
    const cn = _class.classNumber;
    const cnMap = classNumbers.get(cn) ?? 0;
    if (classNumbers.has(cn) && cnMap >= 2) {
      if (result.hasOwnProperty(cn)) {
        result[cn].push(_class);
      } else {
        result[cn] = [_class];
      }
    }
  });
  return result;
}

export function removeDuplicateClasses(classes: IClass[], duplicateClassIds: Number[]): IClass[] {
  const results: IClass[] = [];
  let classNumbersMap: Map<Number, boolean> = new Map();

  duplicateClassIds.forEach(id => {
    classNumbersMap.set(id, false);
  });

  classes.forEach(_class => {
    if (classNumbersMap.has(_class.classNumber) && !classNumbersMap.get(_class.classNumber)) {
      classNumbersMap.set(_class.classNumber, true);
      results.push(_class);
    } else if (!classNumbersMap.has(_class.classNumber)) {
      results.push(_class);
    }
  });

  return results;
}

export function mergeDuplicateClasses(classes: IClass[]): IClass[] {
  const results: IClass[] = [];
  const duplicateClasses = getDuplicateClasses(classes);
  const duplicateClassIds = Object.keys(duplicateClasses).map(_classNumber => parseInt(_classNumber, 10));
  const filteredResults = removeDuplicateClasses(classes, duplicateClassIds);

  if (Object.keys(duplicateClasses).length === 0) {
    return classes;
  }

  filteredResults.forEach(_class => {
    if (duplicateClassIds.includes(_class.classNumber)) {
      const combinedClasses: IClass = combineClasses(duplicateClasses[_class.classNumber]);
      results.push(combinedClasses);
    } else {
      results.push(_class);
    }
  });

  return results;
}

function combineClasses(classes: IClass[]): IClass {
  let results: IClass = JSON.parse(JSON.stringify(classes[0]));
  let combinedStartTimes = '';
  let combinedEndTimes = '';
  let combinedBuildings = '';
  let combinedRoomNumber = '';

  classes.forEach(_class => {
    combinedStartTimes += ', ' + _class.classStartTime;
    combinedEndTimes += ', ' + _class.classEndTime;
    if (_class.mon === 'Y') {
      results.mon = 'Y';
    }
    if (_class.tues === 'Y') {
      results.tues = 'Y';
    }
    if (_class.wed === 'Y') {
      results.wed = 'Y';
    }
    if (_class.thurs === 'Y') {
      results.thurs = 'Y';
    }
    if (_class.fri === 'Y') {
      results.fri = 'Y';
    }
    if (_class.sat === 'Y') {
      results.sat = 'Y';
    }
    if (_class.sun === 'Y') {
      results.sun = 'Y';
    }
    combinedBuildings += ', ' + _class.buildingCode;
    combinedRoomNumber += ', ' + _class.room;
  });

  results.classStartTime = _.trim(combinedStartTimes, ', ');
  results.classEndTime = _.trim(combinedEndTimes, ', ');
  results.buildingCode = _.trim(combinedBuildings, ', ');
  results.room = _.trim(combinedRoomNumber, ', ');

  return results;
}

export function isOnlineClass(instructionMode: string): boolean {
  const onlineInstructionModeCodes = ['OL', 'FO', 'HO'];
  return onlineInstructionModeCodes.includes(instructionMode);
}

export function isAsyncClass(classInfo: IClass): boolean {
  return (
    !hasMeetingDays(classInfo) &&
    isOnlineClass(classInfo.instructionMode) &&
    classInfo.classEndTime.length === 0 &&
    classInfo.classStartTime.length === 0 &&
    (classInfo.buildingCode.length === 0 || classInfo.buildingCode === 'OL') &&
    (classInfo.room.length === 0 || classInfo.room === 'ONLINE')
  );
}

function hasMeetingDays(classInfo: IClass): boolean {
  return (
    classInfo.mon === 'Y' ||
    classInfo.tues === 'Y' ||
    classInfo.wed === 'Y' ||
    classInfo.thurs === 'Y' ||
    classInfo.fri === 'Y' ||
    classInfo.sat === 'Y' ||
    classInfo.sun === 'Y'
  );
}

export function updateWinterTermLabelToWinterIntersession(terms: IOptionProps[]) {
  for (const term of terms) {
    if (term.label?.startsWith('Winter')) {
      term.label = 'Winter Intersession';
      break;
    }
  }
  return terms;
}

export function updatePages(pages: JSX.Element[], currentPage: number): JSX.Element[] {
  let startIndex = 0;
  let lastIndex = pages.length >= 10 ? 10 : pages.length;
  if (currentPage > 5) {
    startIndex = currentPage - 5;
    lastIndex = currentPage + 5;
  }
  if (currentPage > pages.length - 5) {
    startIndex = Math.max(0, pages.length - 10);
    lastIndex = pages.length;
  }
  return pages.length > 10 ? pages.slice(startIndex, lastIndex) : pages;
}

export function getProxyUrl(option = 'dropdown'): string {
  if (window.location.host.includes('www.csusb.edu')) {
    return option === 'dropdown' ? app.settings.proxyDropdownUrl.live : app.settings.proxyClassDataUrl.live;
  }
  if (window.location.host.includes('csusb')) {
    return option === 'dropdown' ? app.settings.proxyDropdownUrl.dev : app.settings.proxyClassDataUrl.dev;
  }
  return option === 'dropdown' ? '/get-class-search-options' : '/get-class-search-data';
}
