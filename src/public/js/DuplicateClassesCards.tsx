import React from 'react';
import { IClass } from './Class';
import {
  getCourseHeaderMarkup,
  getCourseBodyMarkupForRepeatingClasses,
  getCourseFooterMarkup,
  getCourseInfoMarkup,
} from './ClassesCardsHelper';

interface IDuplicateClassesCardsProps {
  classes: IClass[];
  currentTerm: string;
}

export default function DuplicateClassesCards(duplicateClasses: IDuplicateClassesCardsProps): JSX.Element {
  const courseHeaderMarkup = getCourseHeaderMarkup(duplicateClasses.classes[0]);
  const courseInfoMarkup = getCourseInfoMarkup(duplicateClasses.classes[0], duplicateClasses.currentTerm);
  const courseBodyMarkup = getCourseBodyMarkupForRepeatingClasses(duplicateClasses.classes);
  const courseFooterMarkup = getCourseFooterMarkup(duplicateClasses.classes[0]);

  return (
    <div className="course result-item">
      <div className="item-header">
        {courseHeaderMarkup}
        {courseInfoMarkup}
      </div>
      <div className="item-body">
        {courseBodyMarkup}
        {courseFooterMarkup}
      </div>
    </div>
  );
}
