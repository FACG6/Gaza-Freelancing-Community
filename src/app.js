const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const { join } = require('path');
const router = require('./controllers/index');
const helpers = require('./views/helpers/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir: join(__dirname, 'views', 'layouts'),
  partialsDir: join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
  helpers,
}));
app.use(express.static(join(__dirname, '..', 'public')));
app.set('port', process.env.PORT || 3000);
app.use(router);

module.exports = app;
