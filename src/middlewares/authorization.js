module.exports = (req, res, next) => {
  if (req.auth) next();
  else req.redirect('/login');
};
