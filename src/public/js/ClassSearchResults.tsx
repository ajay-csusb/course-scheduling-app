import * as React from 'react';
import { IClass } from './Class';
import { ClassesCards } from './ClassesCards';
import { DisplayFormatTabs } from './DisplayFormatTabs';
import { Grid } from './Grid';
import ExportToExcel from './ExportToExcel';
import DuplicateClassesCards from './DuplicateClassesCards';
import { getDuplicateClasses, removeDuplicateClasses } from './ClassSearchUtils';
import * as _ from 'lodash';
import * as ClassSearchUtils from './ClassSearchUtils';
import { SelectListSortBy } from './SelectListSortBy';
import * as Sort from './Sort';

export interface IClassSearchResultsState {
  format: string;
  sortBy: string;
}

export interface IClassSearchResultsProps {
  classes: IClass[];
  currentTerm: string;
  onChangeOfLoadingMessage: () => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, IClassSearchResultsState> {
  private noOfClasses: number;
  private classes: IClass[];
  constructor(props: IClassSearchResultsProps) {
    super(props);
    this.noOfClasses = 0;
    this.classes = this.props.classes;
    this.state = {
      format: 'lists',
      sortBy: 'catalogNo',
    };
    this.onChangeOfFormat = this.onChangeOfFormat.bind(this);
    this.onChangeOfSortBy = this.onChangeOfSortBy.bind(this);
  }

  public render(): JSX.Element {
    const classesList: JSX.Element[] = this.getClassesInListFormat();
    const classesTable: JSX.Element = this.getClassesInTableFormat();
    let renderMarkup = <i>Try refining the search above to get more results</i>;
    const sortByComponent =
      this.state.format === 'lists' ? (
        <SelectListSortBy sortBy={this.state.sortBy} onChangeOfSortBy={this.onChangeOfSortBy} />
      ) : null;
    if (this.noOfClasses !== 0) {
      renderMarkup = (
        <>
          <div className='form-controls'>
            {sortByComponent}
            <ExportToExcel classes={this.classes} />
          </div>
          <DisplayFormatTabs
            format={this.state.format}
            onChangeOfFormat={this.onChangeOfFormat}
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
    let filteredResults = this.classes;
    const duplicateClasses = getDuplicateClasses(this.classes);
    const duplicateClassIds = Object.keys(duplicateClasses).map(_classNumber => parseInt(_classNumber, 10));
    this.noOfClasses = 0;

    if (duplicateClassIds.length !== 0) {
      filteredResults = removeDuplicateClasses(this.classes, duplicateClassIds);
      return this.getClassesList(filteredResults, duplicateClassIds, duplicateClasses);
    }

    return this.getClassesList(filteredResults);
  }

  private getClassesInTableFormat(): JSX.Element {
    const classes = ClassSearchUtils.mergeDuplicateClasses(this.classes);
    return <Grid classes={classes} />;
  }

  private onChangeOfFormat(selectedFormat: string): void {
    this.setState({
      format: selectedFormat,
    });
    sessionStorage.setItem('format', selectedFormat);
  }

  private getClassesList(classInfo: IClass[], duplicateClassIds: number[] = [], duplicateClasses = {}): JSX.Element[] {
    const classes: JSX.Element[] = [];

    if (classInfo.length !== 0) {
      classInfo.forEach((_class: IClass) => {
        this.noOfClasses++;
        let component = <ClassesCards classes={_class} currentTerm={this.props.currentTerm} />;

        if (duplicateClassIds.includes(_class.classNumber)) {
          component = (
            <DuplicateClassesCards
              classes={duplicateClasses[_class.classNumber]}
              currentTerm={this.props.currentTerm}
            />
          );
        }
        classes.push(<li key={_class.classNumber}>{component}</li>);
      });
    }

    return classes;
  }

  private onChangeOfSortBy(selectedFormat: string): void {
    const order = selectedFormat.split('-').pop();
    const criteria = selectedFormat.split('-').shift();
    if (criteria === 'classNumber') {
      this.classes = Sort.sortByInt(this.classes, order, criteria);
    }
    if (criteria === 'subject' || criteria === 'title' || criteria == 'instructorName') {
      this.classes = Sort.sortByString(this.classes, order, criteria);
    }
    if (criteria === 'days') {
      this.classes = Sort.sortByMeetingDays(this.classes, order);
    }
    if (criteria === 'time') {
      this.classes = Sort.sortByMeetingTime(this.classes, order);
    }
    if (criteria === 'seatsAvailable') {
      this.classes = Sort.sortBySeatsAvailable(this.classes, order);
    }
    if (criteria === 'seatsWaitlist') {
      this.classes = Sort.sortBySeatsAvailableInWaitlist(this.classes, order);
    }
    this.setState({
      sortBy: selectedFormat,
    });
  }
}
