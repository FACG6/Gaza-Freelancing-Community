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
  const sql = 'SELECT users.specalization_id, users.firstname, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, users.birthday, users.city, users.password, specialization.name, field.name, specialization.field_id  from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = $1';
  const values = [userId];
  return connect.query(sql, values);
};
module.exports = {
  checkMobile, checkEmail, getCategories, getSpecalize, getUser,
};


// SELECT * from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = $1
// users.firstname, users.specalization_id, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, specialization.name
// SELECT users.specalization_id, users.firstname, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, users.birthday, users.city, users.password, specialization.name, field.name from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = 1
/*
  /*
   SELECT users.specalization_id,specialization.name, field.name, users.firstname, users.lastname, users.email, users.freelancer_url, users.photo_url, users.mobile_number, users.birthday, users.city, users.password from (users join specialization  on users.specalization_id = specialization.id) join field on field.id =specialization.field_id where users.id = 1
   */
