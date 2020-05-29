import * as React from 'react';
import { IClass } from './Class';
import { ClassesCards } from './ClassesCards';
import { DisplayFormatTabs } from './DisplayFormatTabs';
import { Grid } from './Grid';
import ExportToExcel from './ExportToExcel';

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
    const classesList: JSX.Element[] =  this.getClassesInListFormat();
    const classesTable: JSX.Element =  this.getClassesInTableFormat();
    let renderMarkup = <i>Try refining the search above to get more results</i>;
    if (this.noOfClasses !== 0) {
      <ExportToExcel classes={this.props.classes} />
      renderMarkup = (
        <DisplayFormatTabs
          format={this.state.format}
          onChangeOfFormat={this.updateFormat}
          listClasses={classesList}
          tableClasses={classesTable}
        />
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

  private getClassesInTableFormat(): JSX.Element {
    return (<Grid  classes={this.props.classes}/>);
  }

  private updateFormat(selectedFormat: string): void {
    this.setState({
      format: selectedFormat,
    });
    sessionStorage.setItem('format', selectedFormat);
  }

}
