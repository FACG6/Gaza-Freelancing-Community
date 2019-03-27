const bc = require('bcryptjs');

const hashingPass = pass => new Promise((resolve, reject) => {
  bc.hash(pass, 10, (err, hashPass) => {
    if (err) reject(err);
    resolve(hashPass);
  });
});

module.exports = hashingPass;
