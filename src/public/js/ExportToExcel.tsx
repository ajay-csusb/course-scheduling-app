import * as React from 'react';
import { IClass } from './Class';
import * as FileSaver from 'file-saver';
import { Watchdog } from './Watchdog';
import { app } from './ClassSearch.d';
import { Utils } from './Utils';

interface IExportToExcelProps {
  classes: IClass[];
}

export default class ExportToExcel extends React.Component<IExportToExcelProps>  {
  constructor(props: IExportToExcelProps) {
    super(props);
    this.getExcelDocument = this.getExcelDocument.bind(this);
  }
  render() {
    return (
      <>
        <a id="export-to-excel" onClick={this.getExcelDocument}>Export to Excel</a>
      </>
    );
  }
  public getExcelDocument() {
    this.postData()
    .then((blob: any) => {
      FileSaver.saveAs(blob, 'class-search.xlsx');
    })
    .catch((err: Error) => {
      Watchdog.log(err);
    });
  }

  private postData() {
    const url = Utils.isProd() ? app.settings.excelUrl : app.settings.excelUrlDev;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.classes),
    })
    .then((res: any) => {
      if (res.ok) {
        return res.blob();
      }
    });
  }

}
