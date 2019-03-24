const { parse } = require('url');
const { Pool } = require('pg');
require('dotenv').config();

let DB_URL = '';
switch (process.env.NODE_ENV) {
  case 'test': DB_URL = process.env.TESTING_DB_URL; break;
  case 'production': DB_URL = process.env.PRODUCTION_DB_URL; break;
  case 'development': DB_URL = process.env.DEVELOPMENT_DB_URL; break;
  default: throw new Error('Can not found the DB_URL !!!');
}

const params = parse(DB_URL);
const [user, password] = params.auth.split(':');

const options = {
  user,
  password,
  port: params.port,
  host: params.hostname,
  database: params.pathname.split('/')[1],
  ssl: params.hostname !== 'localhost',
  max: process.env.DB_MAX_CONNECTIONS || 2,
  // return an error after 9 second if connection could not be established
  connectionTimeoutMillis: 9000,
};
module.exports = new Pool(options);
