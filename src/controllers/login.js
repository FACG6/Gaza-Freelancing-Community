exports.get = (request, response) => {
  response.render('login', {
    js: ['helpers/collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'login',
  });
};
