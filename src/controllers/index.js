const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');
const home = require('./home');
const { authorization, permission } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

const router = express.Router();

router.use(auth);
router.post('/specialize', specialize);
router.route('/login')
  .get(permission, login.get)
  .post(login.post);

router.route('/signup')
  .get(permission, signup.get)
  .post(signup.post);

router.use(authorization);
router.get('/', home.get);
router.get('/logout', logout);
router.get('/', home.get);
router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
