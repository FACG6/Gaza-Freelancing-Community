module.exports = (req, res, next) => {
  if (req.auth) next();
  else {
    res.render('login', {
      js: ['helpers/collectData', 'login'],
      css: ['login'],
      layout: 'login_signup',
      title: 'Login',
    });
  }
};
