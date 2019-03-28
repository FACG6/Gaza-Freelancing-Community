const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.auth = decoded;
      next();
    });
  } else {
    req.auth = '';
    next();
  }
};
