const connection = require('../config/db_connection');

const addUser = (userInfo) => {
  const queryObj = {
    text: 'insert into users (firstname, lastname, mobile_number, email, freelancer_url, photo_url,birthday, specalization_id,city,password ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    values: [
      userInfo.firstname,
      userInfo.lastname,
      userInfo.mobile_number,
      userInfo.email,
      userInfo.freelancer_url,
      userInfo.photo_url,
      userInfo.birthday,
      userInfo.specalization_id,
      userInfo.city,
      userInfo.password,
    ],
  };
  return connection.query(queryObj);
};

module.exports = { addUser };
