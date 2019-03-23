const express = require('express');
const error = require('./error');

const router = express.Router();


router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
