const bcrypt = require('bcryptjs');
const getData = require('../../src/database/queries/getData');

exports.get = (request, response) => {
  response.render('login', {
    js: ['/helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login | Gaza Freelancing Community',
  });
};
exports.post = (request, response, next) => {
  getData.checkEmail(request.body.email.trim())
    .then((res) => {
      if (res.rows) {
        bcrypt.compare(request.body.password, res.rows[0].password).then((result) => {
          if (result) {
            next();
          } else {
            response.send(JSON.stringify({ ErrMsg: 'Wrong password' }));
          }
        });
      } else {
        response.send(JSON.stringify({ ErrMsg: 'No such email!' }));
      }
    })
    .catch(() => {
      response.status(500).send(JSON.stringify({ ErrMsg: 'Internal server error' }));
    });
};
