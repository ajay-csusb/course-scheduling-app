import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as bigQueryClient from '../lib/BigQueryHelper';
import { fetchDepartments } from '../lib/DepartmentsExportHelper';

dotenv.config({ path: '.env' });
let message = 'Processing...';
let success: boolean = true;
let errors = 'No errors';
export async function index(_req: Request, res: Response): Promise<any> {
  const deptTableName = process.env && process.env.NODE_ENV !== 'local' ? 'departments' : 'testDepartments';
  const deptHoursTableName =
    process.env && process.env.NODE_ENV !== 'local' ? 'departmentHours' : 'testDepartmentHours';
  const { allDepts, departmentHours } = await fetchDepartments();
  await insertData(deptTableName, allDepts);
  await insertData(deptHoursTableName, departmentHours);
  return res.status(200).json({
    message: message,
    success: success,
    errors: errors,
  });
}

function insertData(tableName: string, data: any): Promise<any> {
  const bigqueryClient = bigQueryClient.getBigQueryConnection();
  const dataset = bigqueryClient.dataset('Departments');
  return dataset
    .table(tableName)
    .insert(data)
    .then((_response: any) => {
      message = 'Added ' + data.length + ' rows to table: ' + tableName;
      console.log('Added ' + data.length + ' rows to table: ' + tableName);
    })
    .catch((err: any) => {
      console.error('Error inserting data into table: ' + tableName);
      console.error({ err });
      errors = 'Error inserting data into table: ' + { err };
      success = false;
    });
}
