const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');
const authorizatin = require('../middlewares/authorization');

const router = express.Router();

router.get('/login', login.get);
router.use(authorizatin);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
