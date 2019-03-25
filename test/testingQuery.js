const tape = require('tape');
const reBuildDB = require('../src/database/config/db_build');
const { getCategories, getSpecalize, checkMobile } = require('./../src/database/queries/getData');

tape('test getCategories ', (t) => {
  reBuildDB()
    .then(() => getCategories())
    .then((res) => {
      t.deepEqual(res.rows[0].name, 'Developer', ' Must Retrun name of the first category');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getSpecalize for \' valid value\'', (t) => {
  reBuildDB()
    .then(() => getSpecalize(1))
    .then((res) => {
      t.equal(res.rows[0].name, 'web develpoer', 'must return name of the firsr specalization');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getSpecalize for \' invalid value\'', (t) => {
  reBuildDB()
    .then(() => getSpecalize(20))
    .then((res) => {
      t.equal(res.rows[0], undefined, 'must return undefined');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});


tape('test checkMobile for \' valid mobile\'', (t) => {
  reBuildDB()
    .then(() => checkMobile('0599999999'))
    .then((res) => {
      t.equal(res.rows[0].mobile_number, '0599999999', 'must return row');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test checkMobile for \' invalid mobile\'', (t) => {
  reBuildDB()
    .then(() => checkMobile('0595599999'))
    .then((res) => {
      t.equal(res.rows[0], undefined, 'must return undefined');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape.onFinish(() => {
  process.exit(0);
});
