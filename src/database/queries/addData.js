const connection = require('../config/db_connection');

const addUser = (userInfo) => {
  const queryValues = Object.keys(userInfo).map(info => userInfo[info]);
  const queryObj = {
    text: 'insert into users (firstname, lastname, mobile_number, email, specalization_id, freelancer_url, photo_url, password ) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [...queryValues],
  };
  return connection.query(queryObj);
};

const addPost = (title, description, userid, speccatizationId) => {
  const sql = {
    text: 'insert into proposal (title , description,user_id, specalization_id) values ($1,$2, $3,$4) RETURNING *',
    values: [title, description, userid, speccatizationId],
  };
  return connection.query(sql);
};

const addRequirment = (text, proposalId) => {
  const sql = {
    text: 'insert into requirement  (text , prop_id ) values ($1,$2) RETURNING *',
    values: [text, proposalId],
  };
  return connection.query(sql);
};

module.exports = { addUser, addPost, addRequirment };
