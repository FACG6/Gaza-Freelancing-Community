const express = require('express');
const logout = require('./logout');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color:red; padding-top:100px">Hello from Gaza Freelancing Community<br><br>GFC</h1>');
});

router.get('/logout', logout);

module.exports = router;
