const bcrypt = require('bcryptjs');
const getData = require('../../src/database/queries/getData');
const pageTitle = require('../views/helpers/makeTitle');
const { validationRegex } = require('../../public/js/helpers/signup');

exports.get = (request, response) => {
  response.render('login', {
    js: ['/helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: pageTitle.titleName('login'),
  });
};
exports.post = (request, response, next) => {
  if (validationRegex.firstStepValidationRegex[3].test(request.body.email.trim())) {
    getData.checkEmail(request.body.email.trim())
      .then((res) => {
        if (res.rows) {
          if (validationRegex.thirdStepValidationRegex[0].test(request.body.password)) {
            return bcrypt.compare(request.body.password, res.rows[0].password);
          }
          response.send({ ErrMsg: 'Wrong Password' });
        }
        response.send({ ErrMsg: 'No such email!' });
      }).then((result) => {
        if (result) {
          next();
        } else {
          response.send({ ErrMsg: 'Wrong password' });
        }
      })
      .catch(() => {
        response.status(500).send({ ErrMsg: 'Internal server error' });
      });
  }
};
