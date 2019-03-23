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
const sections = () => {
  const sqltext = 'select * from field;';
  return connect.query(sqltext);
};
const specialization = (sectionId) => {
  const query = {
    text: 'select id , name  from specialization where field_id = $1',
    values: [sectionId],
  };
  return connect.query(query);
};
module.exports = {
  checkMobile, checkEmail, sections, specialization,
};
