const connect = require('./../config/db_connection');

const checkMobile = (mobile) => {
  const query = {
    text: 'select * from users where  mobile_number = $1',
    values: [mobile],
  };
  return connect.query(query);
};

const checkEmail = (email) => {
  const sql = 'select users.id , users.specalization_id , users.firstname , users.lastname , '
  + 'users.photo_url , users.password ,specialization.name  from users join specialization '
  + 'ON specialization.id = users.specalization_id where email= $1';
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
const getProposalbyUserId = (userid) => {
  const sql = {
    text: 'select proposal.id, users.photo_url , users.firstname , users.lastname ,specialization.name , proposal.description  from proposal join users ON users.id = proposal.user_id join specialization ON specialization.id = users.specalization_id  where proposal.user_id = $1',
    values: [userid],
  };
  return connect.query(sql);
};

const getUser = (userId) => {
  const sql = 'SELECT users.specalization_id, users.firstname, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, users.birthday, users.city, specialization.name as specialization, field.name as category, specialization.field_id  from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = $1';
  const value = [userId];
  return connect.query(sql, value);
};

const getPropsalsbyValue = (specid, searchvalue) => {
  const sql = {
    text: 'select prop.id, prop.title, prop.description,'
      + ' users.firstname, users.lastname, users.photo_url '
      + ' from proposal prop  join users  on prop.user_id = users.id'
      + 'where prop.specalization_id = $1 and (lower(prop.description) like $2 or lower(prop.title) like $2)',
    values: [specid, `%${searchvalue}%`],
  };
  return connect.query(sql);
};

const getProposals = (specId) => {
  const sql = 'select proposal.id, proposal.title, proposal.description,'
    + ' users.firstname, users.lastname, users.photo_url '
    + ' from proposal inner join users  on proposal.user_id = users.id'
    + ' where proposal.specalization_id = $1';
  const values = [specId];
  return connect.query(sql, values);
};

const getProposal = (id) => {
  const sql = 'select proposal.id, users.photo_url , users.firstname , users.lastname,'
  + 'specialization.name ,proposal.title,users.email, users.mobile_number, proposal.description '
  + 'from proposal join users ON users.id = proposal.user_id join specialization ON '
  + 'specialization.id = users.specalization_id  where proposal.id =$1';
  const values = [id];
  return connect.query(sql, values);
};

const getRequirement = (proposalId) => {
  const sql = 'select * from requirement where prop_id = $1';
  const value = [proposalId];
  return connect.query(sql, value);
};


module.exports = {
  checkMobile,
  checkEmail,
  getCategories,
  getSpecalize,
  getProposal,
  getRequirement,
  getProposals,
  getUser,
  getPropsalsbyValue,
  getProposalbyUserId,
};
