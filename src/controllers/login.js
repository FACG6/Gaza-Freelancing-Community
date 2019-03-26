const joi = require('joi');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkEmail } = require('../../src/database/queries/getData');
const { loginSchema } = require('../helpers/validation-schemes');

exports.get = (request, response) => {
  response.render('login', {
    js: ['/helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login',
  });
};

exports.post = (request, response) => {
  const userInfo = { ...request.body };
  const { error } = joi.validate(userInfo, loginSchema);
  if (!error) {
    checkEmail(userInfo.email)
      .then(({ rows: user }) => {
        if (user[0]) {
          bcrypt.compare(userInfo.password, user[0].password, (err, valid) => {
            if (err) throw new Error('Bad Request ');
            else if (valid) {
              const payload = {
                id: user[0].id,
                specialization_id: user[0].specalization_id,
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                photo_url: user[0].photo_url,
              };
              const token = sign(payload, process.env.SECRET);
              response.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 1 }, { httpOnly: true });
              response.status(200).send({ success: 'login ' });
            } else response.status(400).send({ error: 'The password you entered is wrong.' });
          });
        } else response.status(400).send({ error: 'Invalid Email ' });
      })
      .catch(() => {
        response.status(400).send({ error: 'Bad Request' });
      });
  } else {
    response.status(400).send({ error: 'Bad Request' });
  }
};
