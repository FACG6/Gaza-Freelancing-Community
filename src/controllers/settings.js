const { getUser } = require('../database/queries/getData');
const { updateUser } = require('../database/queries/updateData');

exports.get = (request, response) => {
  const userinfo = request.auth;
  getUser(request.auth.id)
    .then((result) => {
      if (result.rows[0]) {
        response.render('settings', {
          js: ['helpers/collectData', 'settings'],
          userInfo: result.rows[0],
          css: ['profile', 'settings'],
          layout: 'profile',
          title: 'settings',
          userinfo,
        });
      }
    })
    .catch(() => { response.status(400).send({ Error: 'Bad Request' }); });
};

exports.put = (request, response) => {
  const {
    firstname, lastname, birthday, mobile, userPhoto, email, userUrl,
  } = { ...request.body };
  updateUser(request.auth.id, firstname, lastname, birthday, mobile, userPhoto, email, userUrl)
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      response.status(400).send({ Error: 'Bad Request' });
    });
};
