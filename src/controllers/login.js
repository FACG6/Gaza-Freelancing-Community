const pageTitle = require('./../views/helpers/makeTitle');

exports.get = (request, response) => {
  response.render('login', {
    js: ['collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: pageTitle.titleName('login'),
  });
};
