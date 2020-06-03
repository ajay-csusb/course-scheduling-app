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
      <>
        <a id="export-to-excel" onClick={this.exportToExcelOnClickHandler}>Export to Excel</a>
      </>
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
