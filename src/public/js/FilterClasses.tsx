import { IClass } from './Class';
import { UserInput } from './UserInput';
import { Quarter } from './Quarter';
import { MeetingDay } from './MeetingDay';
import { Instructor } from './Instructor';
import { Subject } from './Subject';
import { MeetingTime } from './MeetingTime';
import { CourseNumber } from './CourseNumber';
import { GeClasses } from './GeClasses';

export abstract class FilterClasses {

  public static filter(classes: IClass[], uInput: UserInput): IClass[] {
    const result: IClass[] = [];
    const filterClassesBySubject = Subject.filter(classes, uInput);
    const filterClassesByCourseNumber = CourseNumber.filter(filterClassesBySubject, uInput);
    const filterClassesByInstructor = Instructor.filter(filterClassesByCourseNumber, uInput);
    const filterClassesByMeetingTime = MeetingTime.filter(filterClassesByInstructor, uInput);
    const filterClassesByGe = GeClasses.filter(filterClassesByMeetingTime, uInput);
    filterClassesByGe.forEach((_class: IClass) => {
      const meetingDays: MeetingDay = new MeetingDay(_class.mon, _class.tues, _class.wed,
                                                     _class.thurs, _class.fri, _class.sat, _class.sun);
      if (!FilterClasses.matchesUserSelectedCampus(_class.campus, uInput)) {
        return;
      }
      if (!FilterClasses.matchesUserSelectedDays(meetingDays, uInput)) {
        return;
      }
      if (!FilterClasses.matchesUserSelectedInstructionMode(_class.instructionMode, uInput)) {
        return;
      }
      // @todo this should be the last condition until the hack is resolved.
      if (!FilterClasses.matchesUserSelectedQuarter(_class.quarter, uInput)) {
        return;
      }
      result.push(_class);
    });
    return result;
  }

  private static matchesUserSelectedCampus(campus: string, uInput: UserInput): boolean {
    if (uInput.isBothCampusChecked()) {
      return true;
    }
    if (campus === 'MAIN' && uInput.isSanBernardinoChecked()) {
      return true;
    }
    if (campus === 'PALM' && uInput.isPalmDesertChecked()) {
      return true;
    }
    return false;
  }

  private static matchesUserSelectedQuarter(quarter: string, uInput: UserInput): boolean {
    if (uInput.isCurrentQuarterChecked() && quarter === Quarter.getCurrentQuarterId()) {
      return true;
    }
    // @Todo fix this
    if (uInput.isPreviousQuarterChecked() && quarter === Quarter.getQuarterId('prev')) {
      return true;
    }
    return false;
  }

  private static matchesUserSelectedDays(day: MeetingDay, uInput: UserInput): boolean {
    if (uInput.isAllDaysChecked()) {
      return true;
    }
    if (day.monday && uInput.isMondayChecked()) {
      return true;
    }
    if (day.tuesday && uInput.isTuesdayChecked()) {
      return true;
    }
    if (day.wednesday && uInput.isWednesdayChecked()) {
      return true;
    }
    if (day.thursday && uInput.isThursdayChecked()) {
      return true;
    }
    if (day.friday && uInput.isFridayChecked()) {
      return true;
    }
    if (day.saturday && uInput.isSaturdayChecked()) {
      return true;
    }
    if (day.sunday && uInput.isSundayChecked()) {
      return true;
    }
    return false;
  }

  private static matchesUserSelectedInstructionMode(instMode: string, uInput: UserInput): boolean {
    if (uInput.getInstructionMode() === 'all') {
      return true;
    }
    return (instMode.toLowerCase() === uInput.getInstructionMode().toLowerCase());
  }

}
