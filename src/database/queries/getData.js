const connect = require('./../config/db_connection');

const getProposal = (specId) => {
  const sql = 'SELECT users.firstname, users.specalization_id, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, specialization.name, proposal.title,proposal.description, proposal.contact_me from (users join specialization  on users.specalization_id = specialization.id) join proposal on proposal.user_id = users.id where users.specalization_id = $1';
  const values = [specId];
  return connect.query(sql, values);
};

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
    text: 'select id , name  from specialization where field_id = $1',
    values: [categoryId],
  };
  return connect.query(sql);
};
module.exports = {
  checkMobile, checkEmail, getCategories, getSpecalize, getProposal,
};
