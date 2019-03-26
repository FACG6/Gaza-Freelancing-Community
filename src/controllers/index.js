const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');

const router = express.Router();
const { verify } = require('../middlewares/jwtVerification');
const { createCookie } = require('../middlewares/createCookie');

router.use(verify);
router.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color:red; padding-top:100px">Hello from Gaza Freelancing Community<br><br>GFC</h1>');
});
router.post('/login', login.post, createCookie);
router.get('/login', login.get);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
