import * as React from 'react';
import { IClass } from './Class';
import * as FileSaver from 'file-saver';
import * as Watchdog from './Watchdog';
import * as ClassSearchUtils from './ClassSearchUtils';

interface IExportToExcelProps {
  classes: IClass[];
}

export default class ExportToExcel extends React.Component<IExportToExcelProps>  {
  constructor(props: IExportToExcelProps) {
    super(props);
    this.exportToExcelOnClickHandler = this.exportToExcelOnClickHandler.bind(this);
  }

  render() {
    return (
      <div className="align-right">
        <button id="export-to-excel" className="btn-utility" onClick={this.exportToExcelOnClickHandler}>
          <i className="fas fa-file-download"></i>Export to Excel
        </button>
      </div>
    );
  }

  private exportToExcelOnClickHandler(): void {
    ClassSearchUtils.exportToExcelPost(this.props.classes)
    .then((blob: Blob) => {
      FileSaver.saveAs(blob, 'class-search.xlsx');
    })
    .catch((err: Error) => {
      Watchdog.log(err);
    });
  }

}
