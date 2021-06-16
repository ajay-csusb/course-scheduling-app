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
import Pagination from './Pagination';
import SelectListResultsOptions from './SelectListResultsOptions';
import { sortClasses } from './SortByHelper';
import { filterClassesByPageNumberAndLimit } from './ClassSearchResultsHelper';

export interface IClassSearchResultsState {
  sortBy: string;
  limit: number;
}

export interface IClassSearchResultsProps {
  classes: IClass[];
  currentTerm: string;
  currentPage: number;
  tab: string;
  onChangeOfLoadingMessage: () => void;
  onChangeOfPageNumber: (event: any) => void;
  onChangeOfTab: (event: any) => void;
}

export class ClassSearchResults extends React.Component<IClassSearchResultsProps, IClassSearchResultsState> {
  private classes: IClass[];

  constructor(props: IClassSearchResultsProps) {
    super(props);
    this.classes = this.props.classes;
    this.state = {
      sortBy: 'catalogNo',
      limit: 30,
    };
    this.onChangeOfSortBy = this.onChangeOfSortBy.bind(this);
    this.onChangeOfTab = this.onChangeOfTab.bind(this);
    this.onChangeOfPageNumber = this.onChangeOfPageNumber.bind(this);
    this.onChangeOfLimit = this.onChangeOfLimit.bind(this);
  }

  public render(): JSX.Element {
    let renderMarkup: JSX.Element = this.getResults();
    this.props.onChangeOfLoadingMessage();
    return (
      <div id="class-search-results-component">
        <p>{this.classes.length} classes found</p>
        {renderMarkup}
      </div>
    );
  }

  public componentDidUpdate(_prevProps: any, prevState: any): void {
    if (prevState.sortBy !== this.state.sortBy) {
      this.props.onChangeOfPageNumber(1);
    }
  }

  private getClassesInListFormat(): JSX.Element[] {
    const duplicateClasses = getDuplicateClasses(this.props.classes);
    const duplicateClassIds = Object.keys(duplicateClasses).map(_classNumber => parseInt(_classNumber, 10));
    this.classes = removeDuplicateClasses(this.classes, duplicateClassIds);
    return this.getClassesList(this.classes, duplicateClassIds, duplicateClasses);
  }

  private getClassesInTableFormat(): JSX.Element {
    const classes = ClassSearchUtils.mergeDuplicateClasses(this.classes);
    return <Grid classes={classes} />;
  }

  private getClassesList(classInfo: IClass[], duplicateClassIds: number[] = [], duplicateClasses = {}): JSX.Element[] {
    let classes: JSX.Element[] = [];
    if (classInfo.length !== 0) {
      classInfo.forEach((_class: IClass) => {
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
    return filterClassesByPageNumberAndLimit(classes, this.props.currentPage, this.state.limit);
  }

  private getTotalNumberOfPages(): number {
    return Math.ceil(this.classes.length / this.state.limit) === 1
      ? 0
      : Math.ceil(this.classes.length / this.state.limit);
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
    const resultsLimitComponent: JSX.Element = this.getSelectListResultsOptionsComponent();
    if (this.classes.length === 0) {
      return <i>Try refining the search above to get more results</i>;
    }
    return (
      <>
        <div className="filter-group">
          {resultsLimitComponent}
          {sortByComponent}
        </div>
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
    return this.classes.length > 30 && this.props.tab === 'list' && this.state.limit !== -1 ? pagination : <></>;
  }

  private getSortByComponent(): JSX.Element {
    const selectListSortBy: JSX.Element = (
      <div className="form-controls">
        <SelectListSortBy sortBy={this.state.sortBy} onChangeOfSortBy={this.onChangeOfSortBy} />
      </div>
    );
    return this.props.tab === 'list' ? selectListSortBy : <></>;
  }

  private getExcelComponent(): JSX.Element {
    return this.props.tab === 'table' ? <ExportToExcel classes={this.classes} /> : <></>;
  }

  private getSelectListResultsOptionsComponent(): JSX.Element {
    return this.props.tab === 'list' && this.classes.length > 30 ? (
      <SelectListResultsOptions limit={this.state.limit} onChangeOfLimit={this.onChangeOfLimit} />
    ) : (
      <></>
    );
  }

  private onChangeOfLimit(event: any): void {
    const selectedValue = event.target.value === 'all' ? -1 : parseInt(event.target.value, 10);
    this.setState({ limit: selectedValue });
  }

  private onChangeOfSortBy(selectedFormat: string): void {
    this.classes = sortClasses(this.classes, selectedFormat);
    this.setState({
      sortBy: selectedFormat,
    });
  }
}
