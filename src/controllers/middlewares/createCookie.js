const jwt = require('jsonwebtoken');
const getData = require('../../database/queries/getData');

exports.createCookie = (request, response) => {
  getData.checkEmail(request.body.email.trim())
    .then(res => ({
      id: res.rows[0].id,
      specialization_id: res.rows[0].specalization_id,
      firstname: res.rows[0].firstname,
      lastname: res.rows[0].lastname,
      photo_url: res.rows[0].photo_url,
    }))
    .then((res) => {
      const token = jwt.sign(res, process.env.SECRET);
      response.cookie('token', token, { httpOnly: true });
    }).catch(() => {
      response.status(500).send({ ErrMsg: 'Internal server error' });
    });
  response.redirect('/');
};
