import * as React from 'react';
import { IClass } from './Class';
import { ClassesCards } from './ClassesCards';
export interface IClassSearchResultsProps {
  classes: IClass[];
  onChangeOfLoadingMessage: () => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, {}> {

  private noOfClasses: number;
  constructor(props: IClassSearchResultsProps) {
    super(props);
    this.noOfClasses = 0;
  }

  public render(): JSX.Element {
    const classes: JSX.Element[] =  this.getClasses();
    this.props.onChangeOfLoadingMessage();
    return (
      <div id="class-search-results-component">
        <p>Found {this.noOfClasses} classes</p>
        <ul>
          {classes}
        </ul>
      </div>
    );
  }

  private getClasses(): JSX.Element[] {
    const classes: JSX.Element[] = [];
    const filteredResults = this.props.classes;
    this.noOfClasses = 0;
    if (this.props.classes.length !== 0) {
      filteredResults.forEach((_class: IClass) => {
        this.noOfClasses++;
        classes.push(
          <li key={_class.classNumber}>
            <ClassesCards classes={_class} />
            <br />
          </li>
        );
      });
    }
    return classes;
  }

}
