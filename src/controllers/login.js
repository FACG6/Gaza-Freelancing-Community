const bcrypt = require('bcryptjs');
const getData = require('../../src/database/queries/getData');
const validationRegex = require('../../public/js/helpers/signup');

exports.get = (request, response) => {
  response.render('login', {
    js: ['/helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login',
  });
};
exports.post = (request, response, next) => {
  if (validationRegex.firstStepValidationRegex[3].test(request.body.email.trim())) {
    getData.checkEmail(request.body.email.trim())
      .then((res) => {
        if (res.rows[0]) {
          if (validationRegex.thirdStepValidationRegex[0].test(request.body.password)) {
            return bcrypt.compare(request.body.password, res.rows[0].password);
          }
          response.send({ Error: 'Wrong Password' });
        }
        response.send({ Error: 'No such email!' });
      }).then((result) => {
        if (result) {
          next();
        } else {
          response.send({ Error: 'Wrong password' });
        }
      })
      .catch(() => {
        response.status(500).send({ Error: 'Internal server error' });
      });
  } else {
    response.send({ Error: 'No such email!' });
  }
};
exports.get = (request, response) => {
  response.render('login', {
    js: ['helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login',
  });
};
