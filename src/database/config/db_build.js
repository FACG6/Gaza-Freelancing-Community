const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./db_connection');

const reBuildDB = () => {
  const filepath = join(__dirname, 'db_build.sql');
  const sql = readFileSync(filepath).toString();
  return connection.query(sql);
};

module.exports = reBuildDB;
