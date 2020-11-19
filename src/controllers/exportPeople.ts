import { Request, Response } from 'express';
import { insertData } from '../lib/BigQueryHelper';
import { fetchPeople } from '../lib/PeopleExportHelper';

let responseMessage = {
  message: 'Successfully exported data to BigQuery',
  success: true,
  errors: 'No errors encountered',
};

export async function index(_req: Request, res: Response): Promise<any> {
  const tableName = process.env && process.env.NODE_ENV === 'production' ? 'people' : 'testPeople';
  const peopleData = await fetchPeople();
  const response = await insertData({
    dataSetName: 'People',
    tableName: tableName,
    rows: peopleData,
    successMessage: 'Successfully inserted ' + peopleData.length + ' rows into table: ' + tableName,
    errorMessage: 'Error inserting data into table: ' + tableName,
  });
  if (typeof response === 'undefined') updateResponseMessage(tableName);
  return res.status(200).json(responseMessage);
}

function updateResponseMessage(tableName: string): void {
  responseMessage = {
    message: 'Error inserting data into the table: ' + tableName,
    success: false,
    errors: 'Failed to insert data. Please check error logs for more details',
  };
}
