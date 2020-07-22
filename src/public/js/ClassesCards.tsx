import * as React from 'react';
import { IClass } from './Class';
import {
  getCourseHeaderMarkup,
  getCourseInfoMarkup,
  getCourseBodyMarkup,
  getCourseFooterMarkup,
} from './ClassesCardsHelper';

interface IClassesCardsProps {
  classes: IClass;
  currentTerm: string;
}

export class ClassesCards extends React.Component<IClassesCardsProps> {
  private classDetails: IClass;

  public constructor(props: IClassesCardsProps) {
    super(props);
    this.classDetails = this.props.classes;
  }

  public render(): JSX.Element {
    const courseHeaderMarkup = getCourseHeaderMarkup(this.classDetails);
    const courseInfoMarkup = getCourseInfoMarkup(this.classDetails, this.props.currentTerm);
    const courseBodyMarkup = getCourseBodyMarkup(this.classDetails);
    const courseFooterMarkup = getCourseFooterMarkup(this.classDetails);

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
}
