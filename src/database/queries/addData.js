const connection = require('../config/db_connection');

const addUser = (userInfo) => {
  const queryValues = Object.keys(userInfo).map(info => userInfo[info]);
  const queryObj = {
    text: 'insert into users (firstname, lastname, mobile_number, email, freelancer_url, photo_url, specalization_id,password  values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [...queryValues],
  };
  return connection.query(queryObj);
};

module.exports = { addUser };
