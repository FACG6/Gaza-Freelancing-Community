const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
const router = require('./controllers/index');

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.disable('x-powered-by');
app.use(cookieParser());

app.set('port', process.env.PORT || 3000);

app.use(router);


module.exports = app;
