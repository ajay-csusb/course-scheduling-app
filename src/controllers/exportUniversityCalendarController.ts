import { Request, Response } from 'express';
import { insertData } from '../lib/BigQueryHelper';
import { fetchUniversityCalendarData } from '../lib/UniversityCalendarExportHelper';

let responseMessage = {
  message: 'Successfully exported university calendar data to BigQuery',
  success: true,
  errors: 'No errors encountered',
};

export async function index(_req: Request, res: Response): Promise<any> {
  const tableName = process.env && process.env.NODE_ENV === 'production' ? 'universityCalendar' : 'testUniversityCalendar';
  try {
    const universityCalendarData = await fetchUniversityCalendarData();
    const response = await insertData({
      dataSetName: 'UniversityCalendar',
      tableName: tableName,
      rows: universityCalendarData,
      successMessage: `Successfully inserted ${universityCalendarData.length} university calendar data rows into table: ${tableName}`,
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
    message: `Error inserting university calendar data into the table: ${tableName}`,
    success: false,
    errors: `Failed to insert university calendar data. Please check error logs for more details`,
  };
}
