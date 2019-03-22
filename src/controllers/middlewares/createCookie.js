const jwt = require('jsonwebtoken');
const getData = require('../../database/queries/getData');

exports.createCookie = (request, response) => {
  getData.checkEmail(request.body.email.trim())
    .then(res => ({
      id: res.rows[0].id,
      specialization_id: res.rows[0].specalization_id,
    }))
    .then((res) => {
      const token = jwt.sign(res, process.env.SECRET);
      response.cookie('token', token, { httpOnly: true });
    }).catch(() => {
      response.status(500).send(JSON.stringify({ ErrMsg: 'Internal server error' }));
    });
  response.redirect('/');
};
