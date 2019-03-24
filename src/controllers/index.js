const express = require('express');

const router = express.Router();
const proposal = require('./proposal');
const login = require('./login');

router.get('/login', login.get);

router.get('/proposal/:id', proposal.get);

module.exports = router;
