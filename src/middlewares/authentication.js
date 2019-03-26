const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const secret = process.env.SECRET;
  if (token && secret) {
    verify(token, secret, (err, decoded) => {
      if (decoded) req.auth = decoded;
      else res.clearCookie('jwt');
      next();
    });
  } else next();
};
