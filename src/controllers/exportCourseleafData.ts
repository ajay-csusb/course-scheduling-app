import { Request, Response } from 'express';
import { insertData } from '../lib/BigQueryHelper';
import { fetchCourseleafData } from '../lib/CourseleafDataExportHelper';

let responseMessage = {
  message: 'Successfully exported Courseleaf data to BigQuery',
  success: true,
  errors: 'No errors encountered',
};

export async function index(_req: Request, res: Response): Promise<any> {
  const tableName = process.env && process.env.NODE_ENV === 'production' ? 'courseleaf' : 'testCourseleaf';
  try {
    const courseleafData = await fetchCourseleafData();
    const response = await insertData({
      dataSetName: 'Courseleaf',
      tableName: tableName,
      rows: courseleafData,
      successMessage: `Successfully inserted ${courseleafData.length} rows into table: ${tableName}`,
      errorMessage: `Error inserting data into table: ${tableName}`,
    });
    if (typeof response === 'undefined') updateResponseMessage(tableName);
    return res.status(200).json(responseMessage);
  } catch (error) {
    updateResponseMessage(tableName);
    return res.status(400).json(responseMessage);
  }
}

function updateResponseMessage(tableName: string): void {
  responseMessage = {
    message: `Error inserting Courseleaf data into the table: ${tableName}`,
    success: false,
    errors: `Failed to insert Courseleaf data. Please check error logs for more details`,
  };
}
