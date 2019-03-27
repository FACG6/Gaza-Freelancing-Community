const tape = require('tape');
const reBuildDB = require('../src/database/config/db_build');
const { getProposalbyUserId } = require('./../src/database/queries/getData');


tape('test getProposalbyUserId for \'valid propsal\'', (t) => {
  reBuildDB()
    .then(() => getProposalbyUserId(1))
    .then((res) => {
      t.equal(res.rows[0].description, 'we need a front-end developer to working at project', ' Must Retrun description');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test getProposalbyUserId for \'invalid proposal\'', (t) => {
  reBuildDB()
    .then(() => getProposalbyUserId(3))
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
