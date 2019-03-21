const tape = require('tape');
const reBuildDB = require('./../src/database/config/db_build');
const checkEmail = require('./../src/database/queries/getData');

tape('tape test', (t) => {
  t.equal(2, 2, 'pass');
  t.end();
});

tape('Test checkEmail query function', (t) => {
  reBuildDB()
    .then(() => {
      const userEmail = {
        email: 'a.gmail.com',
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
