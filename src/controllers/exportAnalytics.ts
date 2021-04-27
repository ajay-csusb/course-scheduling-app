import { Request, Response } from 'express';
import { insertData } from '../lib/BigQueryHelper';
import { BigQueryTimestamp } from '@google-cloud/bigquery/build/src/bigquery';

let responseMessage = {
  message: 'Successfully exported analytics information to BigQuery',
  success: true,
  errors: 'No errors encountered',
};

export function index(req: Request, res: Response): Response {
  const tableName = process.env && process.env.NODE_ENV === 'production' ? 'analytics' : 'testAnalytics';
  const analyticsData = req.body;
  analyticsData['timestamp'] = new BigQueryTimestamp(new Date()).value;
  try {
    insertData({
      dataSetName: 'Analytics',
      tableName: tableName,
      rows: analyticsData,
      successMessage: `Successfully added analytics data into table: ${tableName}`,
      errorMessage: `Error adding analytics data into table: ${tableName}`,
    });
    console.log(analyticsData);
    return res.status(200).json(responseMessage);
  } catch (error) {
    updateResponseMessage(tableName);
    console.log(error);
    return res.status(400).json(responseMessage);
  }
}

function updateResponseMessage(tableName: string): void {
  responseMessage = {
    message: `Error adding data into the table: ${tableName}`,
    success: false,
    errors: `Failed to add data. Please check error logs for more details`,
  };
}
