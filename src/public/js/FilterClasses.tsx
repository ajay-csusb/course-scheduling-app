import { Class, IClass } from './Class';
import { IClassSearchContainerState } from './ClassSearchContainer';
import { MeetingTime } from './MeetingTime';
import { InstructionMode } from './InstructionMode';
import { GeCourseAttribute } from './GeCourseAttribute';
import * as CourseAttributes from './CourseAttributes';

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
  const {startTime, endTime, instructionMode, geClassesAttribute, courseAttr, term } = params;

  return CourseAttributes.filter(
    GeCourseAttribute.filter(
      InstructionMode.filter(
        MeetingTime.filter(
          filterByActiveClasses(classes),
          startTime, endTime),
        instructionMode),
      geClassesAttribute, term),
    courseAttr
  );
}
