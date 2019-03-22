const pageTitle = require('./../views/helpers/makeTitle');
console.log('iiiiiiii');

exports.get = (request, response) => {
  response.render('login', {
    js: ['helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: pageTitle('Login'),
  });
};
