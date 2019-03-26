exports.authorization = (req, res, next) => (req.auth ? next() : res.redirect('/login'));
exports.permission = (req, res, next) => (req.auth ? res.redirect('/') : next());
