const { parse } = require('url');
const { Pool } = require('pg');
require('dotenv').config();

let DB_URL = '';
if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL;
}else if (process.env.NODE_ENV === 'production'){
  DB_URL = process.env.DATABASE_URL;
} else {
  DB_URL = process.env.DB_URL;
}

if (!DB_URL) throw new Error('Can not found the DB_URL !!!');

const params = parse(DB_URL);
const [ user, password ] = params.auth.split(':');

const options = {
  user, 
  password, 
  port: params.port,
  host: params.hostname,
  database: params.pathname.split('/')[1],
  ssl:params.hostname != 'localhost',
  max: process.env.DB_MAX_CONNECTIONS || 2,
  // return an error after 1 second if connection could not be established
  connectionTimeoutMillis: 1000, 
};

module.exports = new Pool(options);
