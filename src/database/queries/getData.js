const connect = require('./../config/db_connection');

const checkEmail = (email) => {
  const sql = 'SELECT * from users where email = $1';
  const value = [email];
  return connect.query(sql, value);
};

module.exports = checkEmail;
