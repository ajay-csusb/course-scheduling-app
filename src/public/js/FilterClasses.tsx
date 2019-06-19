import { IClass } from './Class';
import { UserInput } from './UserInput';
import { MeetingTime } from './MeetingTime';

export abstract class FilterClasses {

  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    let result: IClass[] = [];
    result = MeetingTime.filter(classes, uInput.getStartTime(), uInput.getEndTime());
    return result;
  }

}
