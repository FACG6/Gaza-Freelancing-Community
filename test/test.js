const tape = require('tape');
const reBuildDB = require('./../src/database/config/db_build');
const checkData = require('./../src/database/queries/getData');

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
      return checkData.checkEmail(userEmail);
    })
    .then((result) => {
      t.equal(result.rows[0], undefined, 'the first row should be empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});

tape('Test checkEmail query function if there is not email match with income email', (t) => {
  reBuildDB()
    .then(() => {
      const email = 'a.gmail.com';
      return checkData.checkEmail(email);
    })
    .then((result) => {
      t.equal(result.rows[0].email, 'a.gmail.com', 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});

tape('Test checkPassword query function if the income password is match with income password from user', (t) => {
  reBuildDB()
    .then(() => {
      const pass = '1234';
      return checkData.checkPassword(pass);
    })
    .then((result) => {
      t.equal(result.rows[0].password, '1234', 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});


tape('Test checkPassword query function if the income password is not match with income password from user', (t) => {
  reBuildDB()
    .then(() => {
      const pass = '12345';
      return checkData.checkPassword(pass);
    })
    .then((result) => {
      console.log(result.rows);
      t.equal(result.rows[0].pass, undefined, 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});
