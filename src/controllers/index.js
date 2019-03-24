const express = require('express');
const signup = require('./signup');
const specialize = require('./specialization');

const router = express.Router();

router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

module.exports = router;
