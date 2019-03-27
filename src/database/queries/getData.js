const connect = require('./../config/db_connection');

const checkMobile = (mobile) => {
  const query = {
    text: 'select * from users where  mobile_number = $1',
    values: [mobile],
  };
  return connect.query(query);
};

const checkEmail = (email) => {
  const sql = 'SELECT * from users where email = $1';
  const value = [email];
  return connect.query(sql, value);
};

const getCategories = () => {
  const sql = 'select * from field;';
  return connect.query(sql);
};

const getSpecalize = (categoryId) => {
  const sql = {
    text: 'select id, name from specialization where field_id = $1',
    values: [categoryId],
  };
  return connect.query(sql);
};

const getProposals = (specId) => {
  const sql = 'select proposal.title, proposal.description, '
  + 'proposal.id, users.firstname, users.lastname, '
  + 'users.photo_url from proposal inner join users '
  + 'on proposal.user_id = users.id where proposal.specalization_id = $1';
  const values = [specId];
  return connect.query(sql, values);
};

module.exports = {
  checkMobile, checkEmail, getCategories, getSpecalize, getProposals,
};
