import { Request, Response } from 'express';
import { getExcelDocument } from '../lib/ExportToExcel';

export function index(req: Request, res: Response): Response {
  if (req.body.length === undefined) {
    return res.sendStatus(400);
  }
  const report = getExcelDocument(req.body);
  return res.send(report);
}
