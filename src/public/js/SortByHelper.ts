import { IClass } from './Class';
import * as Sort from './Sort';

export function sortClasses(classes: IClass[], format: string): IClass[] {
  let sortedClasses: IClass[] = [];
  const order = format.split('-').pop();
  const criteria = format.split('-').shift();
  if (criteria === 'classNumber') {
    sortedClasses = Sort.sortByInt(classes, order, criteria);
  }
  if (criteria === 'subject') {
    sortedClasses = Sort.sortByInt(classes, order, 'catalogNo');
    sortedClasses = Sort.sortByString(classes, order, 'subject');
  }
  if (criteria === 'title' || criteria === 'instructorName') {
    sortedClasses = Sort.sortByString(classes, order, criteria);
  }
  if (criteria === 'days') {
    sortedClasses = Sort.sortByMeetingDays(classes, order);
  }
  if (criteria === 'time') {
    sortedClasses = Sort.sortByMeetingTime(classes, order);
  }
  if (criteria === 'seatsAvailable') {
    sortedClasses = Sort.sortBySeatsAvailable(classes, order);
  }
  return sortedClasses;
}
