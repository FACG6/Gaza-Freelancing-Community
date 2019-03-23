const express = require('express');
const signup = require('./signup');
const data = require('./data');

const router = express.Router();

router.get('/signup', signup.get);
router.post('/data', data.post);
router.post('/signup', signup.post);

module.exports = router;
