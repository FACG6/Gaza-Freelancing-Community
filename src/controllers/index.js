const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color:red; padding-top:100px">Hello from Gaza Freelancing Community<br><br>GFC</h1>');
});

module.exports = router;

