module.exports = (req, res, next) =>
  req.auth ? next() : res.redirect("/login");
