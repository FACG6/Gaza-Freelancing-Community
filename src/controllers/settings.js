const { getUser } = require('../database/queries/getData');

exports.get = (request, response) => {
  if (request.auth) {
    getUser(request.auth.id)
      .then((result) => {
        if (result.rows[0]) {
          response.render('settings', {
            js: ['helpers/collectData', 'settings'],
            userInfo: result.rows[0],
            css: ['profile', 'settings'],
            layout: 'profile',
            title: 'settings',
          });
        }
      })
      .catch(() => { response.status(400).send({ Error: 'Bad Request' }); });
  }
};
