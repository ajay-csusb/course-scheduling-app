import { IClass } from './Class';

export function sortByString(classes: IClass[], key: string = 'asc', column: string = 'subject'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => { return a[column].localeCompare(b[column]); });
  } else {
    classes.sort((a, b) => { return b[column].localeCompare(a[column]); });
  }
  return classes;
}

export function sortByInt(classes: IClass[], key: string = 'asc', column: string = 'classSection'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => { return (parseInt(a[column], 10) - parseInt(b[column], 10)); });
  } else {
    classes.sort((a, b) => { return (parseInt(b[column], 10) - parseInt(a[column], 10)); });
  }
  return classes;
}
