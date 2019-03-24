const express = require('express');
const signup = require('./signup');

const router = express.Router();


router.get('/signup', signup.get);
router.post('/signup', signup.post);

module.exports = router;
