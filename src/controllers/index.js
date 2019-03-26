const express = require('express');
const auth = require('../middlewares/authentication');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');

const router = express.Router();

router.use(auth);

router.route('/login')
  .get(login.get)
  .post(login.post);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
