import { IClass } from './Class';
import * as ClassSearchUtils from './ClassSearchUtils';
export class MeetingTime {
  public static filter(classes: IClass[], startTime: Date, endTime: Date): IClass[] {
    const result: IClass[] = [];

    classes.forEach((_class: IClass) => {
      const userInputStartTimeParsed = ClassSearchUtils.getDateIn12HourFormat(startTime);
      const userInputEndTimeParsed = ClassSearchUtils.getDateIn12HourFormat(endTime);

      if (ClassSearchUtils.isAsyncClass(_class)) {
        result.push(_class);
        return;
      }
      if (!ClassSearchUtils.compareStartTimes(userInputStartTimeParsed, _class.classStartTime)) {
        return;
      }
      if (!ClassSearchUtils.compareEndTimes(userInputEndTimeParsed, _class.classEndTime)) {
        return;
      }

      result.push(_class);
    });

    return result;
  }
}
