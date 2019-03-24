const express = require('express');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');

const router = express.Router();

router.get('/login', login.get);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

module.exports = router;
