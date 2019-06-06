import Moment from 'moment';
import { IClass } from './Class';

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
  if (availableSeats > -1) {
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
  return null;
}

export function getClassStatus(classes: IClass): string {
  const availableSeats = classes.enrolledCapacity - classes.enrolledTotal;
  if (availableSeats > -1) {
    return 'Open';
  }
  return 'Close';
}

export function getInstructionMode(classes: IClass): string {
  if (classes.instructionMode === 'P') {
    return 'Classroom';
  }
  if (classes.instructionMode === 'OL') {
    return 'Online';
  }
  if (classes.instructionMode === 'CM') {
    return 'Online CourseMatch Instruction';
  }
  if (classes.instructionMode === 'FO') {
    return 'Online Asynchronous and/or Synchronous Instruction (in compliance with AB386)';
  }
  if (classes.instructionMode === 'HO') {
    return 'Hybrid Online Asynchronous and Synchronous Instruction';
  }
  if (classes.instructionMode === 'HC') {
    return 'Hybrid Classroom and Online Instruction';
  }
  if (classes.instructionMode === 'OC') {
    return 'Off-Campus';
  }
  if (classes.instructionMode === 'TO') {
    return 'Televised Instruction (origination site)';
  }
  if (classes.instructionMode === 'TR') {
    return 'Televised Instruction (receiving site)';
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
