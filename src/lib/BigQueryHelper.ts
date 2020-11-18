import { BigQuery } from '@google-cloud/bigquery';

export function getBigQueryConnection() {
  const bigQueryOptions = {
    keyFilename: process.env.INIT_CWD + '/application_default_credentials.json',
    projectId: 'csusb-class-schedule',
  };
  return new BigQuery(bigQueryOptions);
}
