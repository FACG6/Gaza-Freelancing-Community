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
    text: 'select id , name  from specialization where field_id = $1',
    values: [categoryId],
  };
  return connect.query(sql);
};

const getUser = (userId) => {
  const sql = 'SELECT users.specalization_id, users.firstname, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, users.birthday, users.city, users.password, specialization.name as specialization, field.name as category, specialization.field_id  from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = $1';
  const values = [userId];
  return connect.query(sql, values);
};

const getProposal = (id) => {
  const sql = 'SELECT users.firstname, users.specalization_id, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, specialization.name, proposal.title,proposal.description, proposal.contact_me, requirement.prop_id from (users join specialization  on users.specalization_id = specialization.id) join (proposal  join requirement on requirement.prop_id = proposal.id) on proposal.user_id = users.id where proposal.id = $1';
  const values = [id];
  return connect.query(sql, values);
};

const getRequirement = (proposalId) => {
  const sql = 'select * from requirement where prop_id = $1';
  const value = [proposalId];
  return connect.query(sql, value);
};

const getProposals = (specId) => {
  const sql = 'select proposal.title, proposal.description, proposal.id, users.firstname, users.lastname, users.photo_url  from proposal inner join users on proposal.user_id = users.id where proposal.specalization_id = $1';
  const values = [specId];
  return connect.query(sql, values);
};

module.exports = {
  checkMobile, checkEmail, getCategories, getSpecalize, getProposal, getRequirement, getProposals, getUser,
};
