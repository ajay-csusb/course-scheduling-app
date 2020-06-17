import { IClass, IMeetingDate } from './Class';

export function filter(classes: IClass[], meetingDays: IMeetingDate): IClass[] {
  const result: IClass[] = [];

  classes.forEach((_class) => {
    if (meetingDays.mon && _class.mon === 'Y') {
      result.push(_class);
    } else if (meetingDays.tue && _class.tues === 'Y') {
      result.push(_class);
    } else if (meetingDays.wed && _class.wed === 'Y') {
      result.push(_class);
    } else if (meetingDays.thu && _class.thurs === 'Y') {
      result.push(_class);
    } else if (meetingDays.fri && _class.fri === 'Y') {
      result.push(_class);
    } else if (meetingDays.sat && _class.sat === 'Y') {
      result.push(_class);
    } else if (meetingDays.sun && _class.sun === 'Y') {
      result.push(_class);
    }
  });

  return (result.length !== 0  ? result : classes);
}