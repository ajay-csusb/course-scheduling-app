import { BigQuery } from '@google-cloud/bigquery';

export interface IInsertTableDataInterface {
  dataSetName: string;
  rows: [];
  tableName: string;
  successMessage: string;
  errorMessage: string;
}

export function getBigQueryConnection() {
  const bigQueryOptions = {
    keyFilename: process.env.INIT_CWD + '/application_default_credentials.json',
    projectId: 'csusb-class-schedule',
  };
  return new BigQuery(bigQueryOptions);
}

export function insertData(args: IInsertTableDataInterface): Promise<any> {
  const { dataSetName, tableName, rows, successMessage, errorMessage } = args;
  const bigqueryClient = getBigQueryConnection();
  const dataset = bigqueryClient.dataset(dataSetName);
  return dataset
    .table(tableName)
    .insert(rows)
    .then((response: any) => {
      console.log(successMessage);
      return response;
    })
    .catch((err: any) => {
      console.error(errorMessage);
      console.error({ err });
      console.error(err.errors);
    });
}
