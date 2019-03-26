const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const reqCookie = req.cookies.token;
  if (reqCookie) {
    jwt.verify(reqCookie, process.env.SECRET, (err, decoded) => {
      if (decoded) {
        req.auth = decoded;
        next();
      } else {
        res.clearCookie('jwt').status(500).send({ Error: 'Internal server Error' });
      }
    });
  } else {
    req.auth = false;
    next();
  }
};
