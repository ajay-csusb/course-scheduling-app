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
import Pagination from './Pagination';

export interface IClassSearchResultsState {
  sortBy: string;
}

export interface IClassSearchResultsProps {
  classes: IClass[];
  currentTerm: string;
  currentPage: number;
  tab: string;
  totalPages: number;
  onChangeOfLoadingMessage: () => void;
  onChangeOfPageNumber: (event: any) => void;
  onChangeOfTab: (event: any) => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, IClassSearchResultsState> {
  private noOfClasses: number;
  private classes: IClass[];
  private hideSortByFilter: boolean;

  constructor(props: IClassSearchResultsProps) {
    super(props);
    this.noOfClasses = 0;
    this.classes = this.props.classes;
    this.state = {
      sortBy: 'catalogNo',
    };
    this.onChangeOfSortBy = this.onChangeOfSortBy.bind(this);
    this.onChangeOfTab = this.onChangeOfTab.bind(this);
    this.onChangeOfPageNumber = this.onChangeOfPageNumber.bind(this);
    this.hideSortByFilter = true;
  }

  public render(): JSX.Element {
    let renderMarkup: JSX.Element = this.getResults();
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
    const duplicateClasses = getDuplicateClasses(this.props.classes);
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

  private getClassesList(classInfo: IClass[], duplicateClassIds: number[] = [], duplicateClasses = {}): JSX.Element[] {
    let classes: JSX.Element[] = [];
    if (classInfo.length !== 0) {
      classInfo.forEach((_class: IClass) => {
        // @Todo Fix this. The number of duplicate classes should be separate from the actual number of classes.
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
    const startIndex = Math.max(0, (this.props.currentPage - 1) * 30);
    const endIndex = startIndex + 30;
    return classes.slice(startIndex, endIndex);
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

  private getTotalNumberOfPages(): number {
    return Math.ceil(this.noOfClasses / 30) === 1 ? 0 : Math.ceil(this.noOfClasses / 30);
  }

  private onChangeOfTab(tabValue: any): void {
    this.props.onChangeOfTab(tabValue);
  }

  private onChangeOfPageNumber(event: any): void {
    this.props.onChangeOfPageNumber(event);
  }

  private getResults(): JSX.Element {
    const tabsComponent: JSX.Element = this.getTabsComponent();
    const paginationComponent: JSX.Element = this.getPaginationComponent();
    const sortByComponent: JSX.Element = this.getSortByComponent();
    const exportToExcelComponent: JSX.Element = this.getExcelComponent();
    if (this.noOfClasses === 0) {
      return <i>Try refining the search above to get more results</i>;
    }
    return (
      <>
        {sortByComponent}
        {exportToExcelComponent}
        {tabsComponent}
        {paginationComponent}
      </>
    );
  }

  private getTabsComponent(): JSX.Element {
    const classesList: JSX.Element[] = this.getClassesInListFormat();
    const classesTable: JSX.Element = this.props.tab === 'table' ? this.getClassesInTableFormat() : <></>;
    return (
      <DisplayFormatTabs
        format={this.props.tab ?? 'list'}
        listClasses={classesList}
        tableClasses={classesTable}
        onChangeOfFormat={this.onChangeOfTab}
      />
    );
  }

  private getPaginationComponent(): JSX.Element {
    const totalNumberOfPages: number = this.getTotalNumberOfPages();
    const pagination = (
      <Pagination
        numberPages={totalNumberOfPages}
        currentPage={this.props.currentPage}
        onChangeOfPageNumber={this.onChangeOfPageNumber}
      />
    );
    return this.noOfClasses > 30 && this.props.tab === 'list' ? pagination : <></>;
  }

  private getSortByComponent(): JSX.Element {
    const selectListSortBy: JSX.Element =
      this.hideSortByFilter === false ? (
        <div className="form-controls">
          <SelectListSortBy sortBy={this.state.sortBy} onChangeOfSortBy={this.onChangeOfSortBy} />
        </div>
      ) : (
        <></>
      );
    return this.props.tab === 'list' ? selectListSortBy : <></>;
  }

  private getExcelComponent(): JSX.Element {
    return this.props.tab === 'table' ? <ExportToExcel classes={this.classes} /> : <></>;
  }
}
