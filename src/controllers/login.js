exports.get = (request, response) => {
  response.render('login', {
    js: ['collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login | Gaza Freelancing Community',
  });
};

