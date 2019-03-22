const express = require('express');
const router = express.Router();
const { verify } = require('./middlewares/jwtVerification');
const { createCookie } = require('./middlewares/createCookie');
const login = require('./login');

router.use(verify);
router.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color:red; padding-top:100px">Hello from Gaza Freelancing Community<br><br>GFC</h1>');
});
router.post('/login', login.post, createCookie);

module.exports = router;
