const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');
const { authorization, permission } = require('../middlewares/authorization');

const router = express.Router();

router.post('/specialize', specialize);

router.route('/login')
  .get(permission, login.get)
  .post(login.post);

router.route('/signup')
  .get(permission, signup.get)
  .post(signup.post);


router.use(authorization);
router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
