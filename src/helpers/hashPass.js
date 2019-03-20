const bc = require('bcryptjs');

const hashingPass = pass => new Promise((resolve, reject) => {
  bc.genSalt(10, (err, salt) => {
    if (err) reject(err);
    else {
      bc.hash(pass, salt, (error, hashResult) => {
        if (err) reject(error);
        else {
          resolve(hashResult);
        }
      });
    }
  });
});

module.exports = hashingPass;
