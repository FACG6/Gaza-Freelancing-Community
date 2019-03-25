module.exports = (req, res, next) => {
  if (req.auth) next();
  else res.redirect('login');
};
