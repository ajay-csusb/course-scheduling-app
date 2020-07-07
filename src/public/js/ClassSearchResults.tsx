import * as React from 'react';
import { IClass } from './Class';
import { ClassesCards } from './ClassesCards';
import { DisplayFormatTabs } from './DisplayFormatTabs';
import { Grid } from './Grid';
import ExportToExcel from './ExportToExcel';
import DuplicateClassesCards from './DuplicateClassesCards';
import { getDuplicateClasses, removeDuplicateClasses } from './ClassSearchUtils';
import * as _ from 'lodash';

export interface IClassSearchResultsState {
  format: string;
}

export interface IClassSearchResultsProps {
  classes: IClass[];
  currentTerm: string;
  onChangeOfLoadingMessage: () => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, IClassSearchResultsState> {
  private noOfClasses: number;
  constructor(props: IClassSearchResultsProps) {
    super(props);
    this.noOfClasses = 0;
    this.state = {
      format: 'lists',
    };
    this.updateFormat = this.updateFormat.bind(this);
  }

  public render(): JSX.Element {
    const classesList: JSX.Element[] = this.getClassesInListFormat();
    const classesTable: JSX.Element = this.getClassesInTableFormat();
    let renderMarkup = <i>Try refining the search above to get more results</i>;
    if (this.noOfClasses !== 0) {
      renderMarkup = (
        <>
          <ExportToExcel classes={this.props.classes} />
          <DisplayFormatTabs
            format={this.state.format}
            onChangeOfFormat={this.updateFormat}
            listClasses={classesList}
            tableClasses={classesTable}
          />
        </>
      );
    }
    this.props.onChangeOfLoadingMessage();
    return (
      <div id="class-search-results-component">
        <p>{this.noOfClasses} classes found</p>
        {renderMarkup}
      </div>
    );
  }

  private getClassesInListFormat(): JSX.Element[] {
    const classes: JSX.Element[] = [];
    let filteredResults = this.props.classes;
    const duplicateClasses = getDuplicateClasses(this.props.classes);
    const duplicateClassIds = Object.keys(duplicateClasses).map(_classNumber => parseInt(_classNumber, 10));
    this.noOfClasses = 0;

    if (duplicateClassIds.length !== 0) {
      filteredResults = removeDuplicateClasses(this.props.classes, duplicateClassIds);
    }

    if (this.props.classes.length !== 0) {
      filteredResults.forEach((_class: IClass) => {
        this.noOfClasses++;
        if (duplicateClassIds.includes(_class.classNumber)) {
          classes.push(
            <li key={_class.classNumber}>
              <DuplicateClassesCards
                classes={duplicateClasses[_class.classNumber]}
                currentTerm={this.props.currentTerm}
              />
            </li>
          );
        } else {
          classes.push(
            <li key={_class.classNumber}>
              <ClassesCards classes={_class} currentTerm={this.props.currentTerm} />
            </li>
          );
        }
      });
    }

    return classes;
  }

  private getClassesInTableFormat(): JSX.Element {
    return <Grid classes={this.props.classes} />;
  }

  private updateFormat(selectedFormat: string): void {
    this.setState({
      format: selectedFormat,
    });
    sessionStorage.setItem('format', selectedFormat);
  }
}
