import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import path from 'path';
import expressValidator from 'express-validator';
import * as homeController from './controllers/home';
import * as exportToExcelController from './controllers/exportToExcel';
import * as exportToBigQueryController from './controllers/exportToBigQuery';
import * as exportDepartmentsController from './controllers/exportDepartments';
import * as exportPeopleController from './controllers/exportPeople';
import * as exportEventsController from './controllers/exportEvents';
import * as exportAnalyticsController from './controllers/exportAnalytics';
import * as exportUniversityCalendarController from './controllers/exportUniversityCalendarController';
import * as exportCourseleafDataController from './controllers/exportCourseleafData';
import * as getClassSearchOptions from './controllers/classSearchOptions';
import * as getClassSearchData from './controllers/classSearchData';
import cors from 'cors';
import { loadEnvironmentVariables } from './lib/Utils';

loadEnvironmentVariables();
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
app.use(cors())
app.get('/', homeController.index);
app.post('/export-to-excel', exportToExcelController.index);
app.get('/export-to-bigquery/:termId?', exportToBigQueryController.index);
app.get('/export-departments', exportDepartmentsController.index);
app.get('/export-people', exportPeopleController.index);
app.get('/export-events', exportEventsController.index);
app.post('/export-analytics', exportAnalyticsController.index);
app.get('/export-university-calendar', exportUniversityCalendarController.index);
app.get('/export-courseleaf-data', exportCourseleafDataController.index);
app.get('/get-class-search-options', getClassSearchOptions.index);
app.post('/get-class-search-data', getClassSearchData.index);

export default app;
