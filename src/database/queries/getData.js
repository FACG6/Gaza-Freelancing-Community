const connect = require('./../config/db_connection');

const checkPassword = (pass) => {
  const sql = 'select password from users where pass = $1';
  const value = [pass];
  return connect.query(sql, value);
};

module.exports = checkPassword;
const checkEmail = (email) => {
  const sql = 'SELECT email from users where email = $1';
  const value = [email];
  return connect.query(sql, value);
};

module.exports = { checkEmail, checkPassword };
