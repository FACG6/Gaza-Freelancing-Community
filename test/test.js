const tape = require('tape');
const reBuildDB = require('./../src/database/config/db_build');
const { addUser } = require('../src/database/queries/addData');

tape('test add user for firstname', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Alami',
      mobile_number: '12345454',
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      specalization_id: 1,
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].firstname, 'Ahmed', 'must be Ahmed');
      t.end();
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});

tape('test add user for lastname', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: '1234567891',
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      specalization_id: 1,
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].lastname, 'Elalmi', 'must be Elalmi');
      t.end();
    })
    .catch(errr => t.error(errr));
});

tape('test add user for mobile number', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: '1234512345',
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].mobile_number, '12345', 'the mobile_number must be 1234512345');
      t.end();
    })
    .catch(errr => t.error(errr));
});
