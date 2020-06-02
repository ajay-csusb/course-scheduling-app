import { Request, Response } from 'express';
import { getExcelDocument } from '../lib/ExportToExcel';

export function index(req: Request, res: Response): any {
  if (req.body.length === undefined) {
    return res.send(400);
  }
  const report = getExcelDocument(req.body);
  return res.send(report);
}
