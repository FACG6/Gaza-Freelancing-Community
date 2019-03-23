const tape = require('tape');
const reBuildDB = require('./../src/database/config/db_build');
const checkEmail = require('./../src/database/queries/getData');

tape('tape test', (t) => {
  t.equal(2, 2, 'pass');
  t.end();
});

tape('Test checkEmail query function if there is email match with income email', (t) => {
  reBuildDB()
    .then(() => {
      const userEmail = {
        email: 'aa.gmail.com',
      };
      return checkEmail(userEmail);
    })
    .then((result) => {
      t.equal(result.rows[0], undefined, 'the first row should be empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});

tape('Test checkEmail query function if there is no email match with income email', (t) => {
  reBuildDB()
    .then(() => {
      const email = 'a.gmail.com';
      return checkEmail(email);
    })
    .then((result) => {
      t.equal(result.rows[0].email, 'a.gmail.com', 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});

tape('asd', (t) => {
  t.equal(1, 1, 'dfgd');
  t.end();
});
