const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');
const home = require('./home');
const { authorization, permission } = require('../middlewares/authorization');

const router = express.Router();

router.post('/specialize', specialize);

router.route('/login')
  .get(permission, login.get)
  .post(login.post);

router.route('/signup')
  .get(permission, signup.get)
  .post(signup.post);
<<<<<<< HEAD
router.get('/', home.get);

router.route('/login')
  .get(permission, login.get);

router.use(authorization);
=======

router.use(authorization);
router.get('/', home.get);
>>>>>>> b79c53b4cda437c999453f62d2be5f53dbb88f08
router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
