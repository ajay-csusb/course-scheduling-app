import { Request, Response } from 'express';
import { fetchDepartments } from '../lib/DepartmentsExportHelper';
import { insertData } from '../lib/BigQueryHelper';

let responseMessage = {
  message: 'Successfully added data',
  success: true,
  errors: 'No errors',
};
export async function index(_req: Request, res: Response): Promise<any> {
  const deptTableName = process.env && process.env.NODE_ENV !== 'local' ? 'departments' : 'testDepartments';
  const deptHoursTableName =
    process.env && process.env.NODE_ENV !== 'local' ? 'departmentHours' : 'testDepartmentHours';
  const { allDepts, departmentHours } = await fetchDepartments();
  const responseDept = await insertData({
    dataSetName: 'Departments',
    tableName: deptTableName,
    rows: allDepts,
    successMessage: 'Successfully inserted ' + allDepts.length + ' rows into table: ' + deptTableName,
    errorMessage: 'Error inserting data into table: ' + deptTableName,
  });
  const responseDeptHour = await insertData({
    dataSetName: 'Departments',
    tableName: deptHoursTableName,
    rows: departmentHours,
    successMessage: 'Successfully inserted ' + departmentHours.length + ' rows into table: ' + deptHoursTableName,
    errorMessage: 'Error inserting data into table: ' + deptHoursTableName,
  });
  if (typeof responseDept === 'undefined') {
    updateErrorMessage(deptTableName);
  }
  if (typeof responseDeptHour === 'undefined') {
    updateErrorMessage(deptHoursTableName);
  }
  return res.status(200).json(responseMessage);
}

function updateErrorMessage(tableName: string) {
  responseMessage = {
    message: 'Error inserting data into the table: ' + tableName,
    success: false,
    errors: 'Failed to insert data',
  };
}
