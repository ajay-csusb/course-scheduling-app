import React, { Component } from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';

export interface IPaginationProps {
  numberPages: number;
  onChangeOfPageNumber: (event: any) => void;
  currentPage: number;
}

export default class Pagination extends Component<IPaginationProps, {}> {
  constructor(props: IPaginationProps) {
    super(props);
    this.handleOnChangeOfPageNumber = this.handleOnChangeOfPageNumber.bind(this);
  }

  public render(): React.ReactNode {
    let prevPage = <></>;
    let nextPage = <></>;
    let firstPage = <></>;
    let lastPage = <></>;
    let pages: JSX.Element[] = [];
    const firstPageNumber = 1;
    const lastPageNumber = this.props.numberPages;
    const prevPageNumber = this.props.currentPage !== 1 ? this.props.currentPage - 1 : null;
    const nextPageNumber = this.props.currentPage !== this.props.numberPages ? this.props.currentPage + 1 : null;
    if (this.props.numberPages > 1) {
      prevPage = prevPageNumber ? this.getPagerMarkup(prevPageNumber, 'Previous', 0) : <></>;
      nextPage = nextPageNumber ? this.getPagerMarkup(nextPageNumber, 'Next', this.props.currentPage + 1) : <></>;
      firstPage = this.getPagerMarkup(firstPageNumber, 'First', firstPageNumber - 2);
      lastPage = this.getPagerMarkup(lastPageNumber, 'Last', lastPageNumber + 2);
    }
    for (let index = 0; index < this.props.numberPages; index++) {
      const pageNumber = index + 1;
      pages.push(this.getPagerMarkup(pageNumber, pageNumber.toString(), pageNumber));
    }
    pages = ClassSearchUtils.updatePages(pages, this.props.currentPage);
    return (
      <div>
        <ul className="pagination">
          {firstPage}
          {prevPage}
          {pages}
          {nextPage}
          {lastPage}
        </ul>
      </div>
    );
  }

  private handleOnChangeOfPageNumber(event: any): void {
    const currentPageNumber = parseInt(event.target.getAttribute('data-page'), 10);
    this.props.onChangeOfPageNumber(currentPageNumber);
  }

  private getPagerMarkup(pageNumber: number, label: string, key: number): JSX.Element {
    const cssClass = this.props.currentPage === pageNumber ? 'current page-number' : 'page-number';
    return (
      <li className={`page-${pageNumber}`} key={key}>
        <a
          title={`Go to page ${pageNumber}`}
          onClick={this.handleOnChangeOfPageNumber}
          data-page={`${pageNumber}`}
          className={cssClass}
          href='#class-search-results-component'
        >
          {label}
        </a>
      </li>
    );
  }
}
