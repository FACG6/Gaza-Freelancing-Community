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
            if (err) throw new Error('Bad Request');
            if (valid) {
              const {
                id, specalization_id, firstname, lastname, photo_url, name,
              } = { ...user[0] };
              const payload = {
                id, specalization_id, firstname, lastname, photo_url, name,
              };
              const token = sign(payload, process.env.SECRET);
              response.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 1 }, { httpOnly: true });
              response.status(200).send({ success: 'Login Success' });
            } else response.status(400).send({ error: 'Check Password' });
          });
        } else response.status(400).send({ error: 'Check Email ' });
      })
      .catch((err) => {
        response.status(400).send({ error: err });
      });
  } else {
    response.status(400).send({ error: 'Check Email Or Password' });
  }
};
