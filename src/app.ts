import express from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import expressValidator from 'express-validator';

dotenv.config({ path: '.env' });

// Controllers (route handlers)
import * as homeController from './controllers/home';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.set('etag', false);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 0 })
);

if (process.env && process.env.NODE_ENV === 'local') {
  const nocache = require('nocache');
  app.use(nocache());
}
/**
 * Primary app routes.
 */
app.get('/', homeController.index);

export default app;
