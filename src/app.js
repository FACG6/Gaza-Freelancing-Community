const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('hello from server');
});

module.exports = app;
