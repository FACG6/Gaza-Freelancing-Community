const connect = require('../config/db_connection');

const updateUser = (id, firstname, lastname, birthday, mobile, userPhoto, email, userUrl) => {
  const sql = `update users set firstname = ${firstname}, lastname = ${lastname}, birthday=${birthday}, mobile_number = ${mobile}, photo_url = ${userPhoto}, email = ${email}, freelancer_url =${userUrl} where users.id = $1`;
  const value = [id];
  return connect.query(sql, value);
};

module.exports = updateUser;
