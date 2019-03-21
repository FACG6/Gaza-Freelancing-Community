const connect = require('./../config/db_connection');

const checkPassword = (pass) => {
  const sql = 'select password from users where pass = $1';
  const value = [pass];
  return connect.query(sql, value);
};

module.exports = checkPassword;
