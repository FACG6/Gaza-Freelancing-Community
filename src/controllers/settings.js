const getUser = require('../database/queries/getData');

exports.get = (request, response) => {
  if (request.auth) {
    const userId = request.auth.id;
    getUser.getUser(userId)
      .then((result) => {
        response.render('settings', {
          js: ['helpers/collectData', 'settings'],
          userInfo: result.rows[0],
          css: ['settings'],
          layout: 'main',
          title: 'settings',
        });
      })
      .catch((err) => {
        response.status(400).send({ Error: 'Bad Request' });
      });
  }
};
