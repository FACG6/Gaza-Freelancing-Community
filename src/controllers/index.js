const express = require('express');
const signup = require('./signup');

const router = express.Router();
const login = require('./login');


router.get('/login', login.get);
router.get('/signup', signup.get);
router.post('/signup', signup.post);

module.exports = router;
