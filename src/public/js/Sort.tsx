import { IClass, Class } from './Class';
import * as ClassSearchUtils from './ClassSearchUtils';
import Moment from 'moment';

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

export function sortByCampus(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      if (a.campus === 'PALM' && b.campus === 'MAIN') {
        return -1;
      } else if (a.campus === 'MAIN' && b.campus === 'PALM') {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    classes.sort((a, b) => {
      if (a.campus === 'PALM' && b.campus === 'MAIN') {
        return 1;
      } else if (a.campus === 'MAIN' && b.campus === 'PALM') {
        return -1;
      } else {
        return 0;
      }
    });
  }
  return classes;
}

export function sortByInstructionMode(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      return ClassSearchUtils.getInstructionMode(a).localeCompare(ClassSearchUtils.getInstructionMode(b));
    });
  } else {
    classes.sort((a, b) => {
      return ClassSearchUtils.getInstructionMode(b).localeCompare(ClassSearchUtils.getInstructionMode(a));
    });
  }
  return classes;
}

export function sortByMeetingTime(classes: IClass[], key: string = 'asc'): IClass[] {
  const classesHavingStartTime = classes.filter((_class) => {
    return (_class.classStartTime.length !== 0);
  });
  const classesHavingNoStartTime = classes.filter((_class) => {
    return (_class.classStartTime.length === 0);
  });
  if (key === 'asc') {
    classesHavingStartTime.sort((a, b) => {
      const startTimeA = Moment(a.classStartTime, 'h:mma');
      const startTimeB = Moment(b.classStartTime, 'h:mma');
      if (startTimeA.isAfter(startTimeB)) {
        return 1;
      }
      return -1;
    });
  } else {
    classesHavingStartTime.sort((a, b) => {
      const startTimeA = Moment(a.classStartTime, 'h:mma');
      const startTimeB = Moment(b.classStartTime, 'h:mma');
      if (startTimeB.isAfter(startTimeA)) {
        return 1;
      }
      return -1;
    });
  }
  return classesHavingStartTime.concat(classesHavingNoStartTime);
}

export function sortByMeetingDays(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      const classObjA = new Class(a);
      const classObjB = new Class(b);
      return classObjA.getClassMeetingDates().localeCompare(classObjB.getClassMeetingDates());
    });
  } else {
    classes.sort((a, b) => {
      const classObjA = new Class(a);
      const classObjB = new Class(b);
      return classObjB.getClassMeetingDates().localeCompare(classObjA.getClassMeetingDates());
    });
  }
  return classes;
}

export function sortBySeatsAvailable(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      return ClassSearchUtils.getNoOfAvailableSeats(a) - ClassSearchUtils.getNoOfAvailableSeats(b);
    });
  } else {
    classes.sort((a, b) => {
      return ClassSearchUtils.getNoOfAvailableSeats(b) - ClassSearchUtils.getNoOfAvailableSeats(a);
    });
  }
  return classes;
}

export function sortBySeatsAvailableInWaitlist(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      return ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(a) - ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(b);
    });
  } else {
    classes.sort((a, b) => {
      return ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(b) - ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(a);
    });
  }
  return classes;
}

export function sortByBuildingNumber(classes: IClass[], key: string = 'asc'): IClass[] {
  if (key === 'asc') {
    classes.sort((a, b) => {
      return ClassSearchUtils.getRoomNumber(a).localeCompare(ClassSearchUtils.getRoomNumber(b));
    });
  } else {
    classes.sort((a, b) => {
      return ClassSearchUtils.getRoomNumber(b).localeCompare(ClassSearchUtils.getRoomNumber(a));
    });
  }

  return classes;
}
