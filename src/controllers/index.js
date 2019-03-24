const express = require('express');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const error = require('./error');

const router = express.Router();

router.get('/login', login.get);
router.post('/specialize', specialize);
router.route('/signup')
  .get(signup.get)
  .post(signup.post);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
