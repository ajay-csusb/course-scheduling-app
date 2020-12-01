import { Request, Response } from 'express';
import { insertData } from '../lib/BigQueryHelper';
import { fetchEvents } from '../lib/EventsExportHelper';

let responseMessage = {
  message: 'Successfully exported events data to BigQuery',
  success: true,
  errors: 'No errors encountered',
};

export async function index(_req: Request, res: Response): Promise<any> {
  const tableName = process.env && process.env.NODE_ENV === 'production' ? 'events' : 'testEvents';
  try {
    const eventsData = await fetchEvents();
    const response = await insertData({
      dataSetName: 'Events',
      tableName: tableName,
      rows: eventsData,
      successMessage: `Successfully inserted ${eventsData.length} events into table: ${tableName}`,
      errorMessage: `Error inserting events into table: ${tableName}`,
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
    message: `Error inserting events into the table: ${tableName}`,
    success: false,
    errors: `Failed to insert events. Please check error logs for more details`,
  };
}
