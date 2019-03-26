const getUser = require('../database/queries/getData');

exports.get = (request, response) => {
  getUser.getUser(1)
    .then((result) => {
    //   console.log(result.rows[0]);
      response.render('settings', {
        js: ['helpers/collectData', 'settings'],
        userInfo: result.rows[0],
        css: ['settings'],
        layout: 'main',
        title: 'settings',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
