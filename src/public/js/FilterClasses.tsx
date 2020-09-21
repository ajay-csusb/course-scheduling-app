import { Class, IClass } from './Class';
import { IClassSearchContainerState } from './ClassSearchContainer';
import { MeetingTime } from './MeetingTime';
import { InstructionMode } from './InstructionMode';
import { GeCourseAttribute } from './GeCourseAttribute';
import * as CourseAttributes from './CourseAttributes';
import * as MeetingDay from './MeetingDay';
import * as OpenClassesFilter from './OpenClassesFilter';
import * as CareerLevelsFilter from './CareerLevelsFilter';
import * as CourseLevelsFilter from './CourseLevelsFilter';

// @Todo create a new module to filter active classes
export function filterByActiveClasses(classes: IClass[]): IClass[] {
  const results: IClass[] = [];
  for (const _class of classes) {
    const currClass = new Class(_class);
    if (currClass.isActive()) {
      results.push(_class);
    }
  }
  return results;
}

export function filter(classes: IClass[], params: IClassSearchContainerState): IClass[] {
  const {
    startTime,
    endTime,
    instructionMode,
    geClassesAttribute,
    courseAttr,
    term,
    meetingDate,
    showOpenClasses,
    careerLevelOptions,
    courseLevelsOptions,
  } = params;

  return CourseAttributes.filter(
    GeCourseAttribute.filter(
      InstructionMode.filter(
        MeetingDay.filter(
          MeetingTime.filter(
            CourseLevelsFilter.filter(
              CareerLevelsFilter.filter(
                OpenClassesFilter.filter(filterByActiveClasses(classes), showOpenClasses),
                careerLevelOptions
              ),
              courseLevelsOptions
            ),
            startTime,
            endTime
          ),
          meetingDate
        ),
        instructionMode
      ),
      geClassesAttribute,
      term
    ),
    courseAttr
  );
}
