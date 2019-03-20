const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

const app = express();
const router = require('./controllers/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(cookieParser());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(router);

module.exports = app;
