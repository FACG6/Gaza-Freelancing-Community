const getUser = require('../database/queries/getData');

exports.get = (request, response) => {
  getUser();
//   response.render('settings', {
//     js: ['helpers/collectData', 'settings'],
//     css: ['settings'],
//     layout: 'main',
//     title: 'settings',
//   });
};
