import { UserInput } from './UserInput';
import { IClass } from './Class';
import * as ClassSearchUtils from './ClassSearchUtils';
export class MeetingTime {

  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    classes.forEach((_class: IClass) => {
      const userInputStartTime: Date = uInput.getStartTime();
      const userInputEndTime: Date = uInput.getEndTime();
      const userInputStartTimeParsed = ClassSearchUtils.getDateIn12HourFormat(userInputStartTime);
      const userInputEndTimeParsed = ClassSearchUtils.getDateIn12HourFormat(userInputEndTime);
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
