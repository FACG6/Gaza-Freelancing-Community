const tape = require('tape');
const reBuildDB = require('../src/database/config/db_build');
const {
  getCategories,
  getSpecalize,
  checkMobile,
  getPropsalsbyValue,
} = require('./../src/database/queries/getData');

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
      t.equal(res.rows[0].name, 'Front develpoer', 'must return name of the first specalization');
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
    .then(() => checkMobile('0544444444'))
    .then((res) => {
      t.equal(res.rows[0], undefined, 'must return undefined');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getPropsalsbyValue for \'case sensitive value to description\'', (t) => {
  reBuildDB()
    .then(() => getPropsalsbyValue(1, ('FroNt').toLowerCase()))
    .then((res) => {
      t.equal(res.rows[0].description, 'we need a front-end developer to working at project', ' Must Retrun description');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getPropsalsbyValue for \' valid value to title\'', (t) => {
  reBuildDB()
    .then(() => {
      getPropsalsbyValue(1, ('develpoer').toLowerCase())
        .then((res) => {
          t.equal(res.rows[0].title, 'front-end develpoer', ' Must Retrun front-end develpoer');
          t.end();
        }).catch((err) => {
          t.error(err);
          t.end();
        });
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getPropsalsbyValue for \'invalid value for title and description\'', (t) => {
  reBuildDB()
    .then(() => getPropsalsbyValue(1, ('enter').toLowerCase()))
    .then((res) => {
      t.equal(res.rows[0], undefined, ' Must Retrun undefined');
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
