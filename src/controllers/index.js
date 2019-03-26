const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const settings = require('./settings');
const error = require('./error');

const router = express.Router();

router.get('/login', login.get);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);
router.get('/settings', settings.get);

router.get('/logout', logout);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
