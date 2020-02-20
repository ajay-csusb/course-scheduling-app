import * as React from 'react';
import { IClass } from './Class';
import { ClassesCards } from './ClassesCards';
export interface IClassSearchResultsProps {
  classes: IClass[];
  currentTerm: string;
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
        <p>{this.noOfClasses} classes found</p>
        {this.noOfClasses === 0 && <i>Try refining the search above to get more results</i>}
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
            <ClassesCards classes={_class} currentTerm={this.props.currentTerm}/>
          </li>
        );
      });
    }
    return classes;
  }

}
