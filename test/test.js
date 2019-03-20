const tap = require('tape');

const reBuild = require('../src/database/config/db_build');
const { addUser } = require('../src/database/queries/addData');

tap('test add user for firstname', (t) => {
  reBuild()
    .then(addUser({
      firstname: 'Ahmed',
      lastname: 'Alami',
      mobile_number: 12345454,
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      birthday: null,
      city: 'gaza',
      password: '123',
    }).then((res) => {
      t.equal(res.rows[0].firstname, 'Ahmed', 'must be Ahmed');
      t.end();
    }).catch(err => t.error(err)))
    .catch(errr => t.error(errr));
});

tap('test add user for lastname', (t) => {
  reBuild()
    .then(addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: 12345454,
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      birthday: null,
      city: 'gaza',
      password: '123',
    }).then((res) => {
      t.equal(res.rows[0].lastname, 'Elalmi', 'must be Elalmi');
      t.end();
    }).catch(err => t.error(err)))
    .catch(errr => t.error(errr));
});

tap('test add user for mobile number', (t) => {
  reBuild()
    .then(addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: 12345,
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      birthday: null,
      city: 'gaza',
      password: '123',
    }).then((res) => {
      t.equal(res.rows[0].mobile_number, 12345, 'the mobile_number must be 12345');
      t.end();
    }).catch(err => t.error(err)))
    .catch(errr => t.error(errr));
});

tap('test add user for city', (t) => {
  reBuild()
    .then(addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: 12345454,
      email: 'ahmed@gmail.com',
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      birthday: null,
      city: 'gaza',
      password: '123',
    }).then((res) => {
      t.equal(res.rows[0].city, 'gaza', 'must be gaza');
      t.end();
    }).catch(err => t.error(err)))
    .catch(errr => t.error(errr));
});
