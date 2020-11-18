import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import expressValidator from 'express-validator';
import * as homeController from './controllers/home';
import * as exportToExcelController from './controllers/exportToExcel';
import * as exportToBigQueryController from './controllers/exportToBigQuery';
import * as exportDepartmentsController from './controllers/exportDepartments';
import cors from 'cors';

dotenv.config({ path: '.env' });
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.set('etag', false);
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));
if (process.env && process.env.NODE_ENV === 'local') {
  const nocache = require('nocache');
  app.use(nocache());
}
app.use(cors());
app.get('/', homeController.index);
app.post('/export-to-excel', exportToExcelController.index);
app.get('/export-to-bigquery/:termId?', exportToBigQueryController.index);
app.get('/export-departments', exportDepartmentsController.index);

export default app;
