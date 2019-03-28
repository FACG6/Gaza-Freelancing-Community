const express = require('express');
const logout = require('./logout');
const signup = require('./signup');
const specialize = require('./specialization');
const login = require('./login');
const settings = require('./settings');
const proposal = require('./proposal');
const error = require('./error');
const home = require('./home');
const { authorization, permission } = require('../middlewares/authorization');
const { search } = require('./search');
const profile = require('./profile');

const auth = require('../middlewares/authentication');

const router = express.Router();


router.use(auth);
router.post('/specialize', specialize);

router.route('/login')
  .get(permission, login.get)
  .post(login.post);

router.route('/signup')
  .get(permission, signup.get)
  .post(signup.post);


router.use(authorization);
router.get('/settings', settings.get);
router.put('/settings', settings.put);
router.post('/search', search);

router.get('/proposal/:id', proposal.get);
router.get('/', home.get);
router.get('/logout', logout);
router.route('/profile')
  .get(profile.get);

router.use(error.notfound);
router.use(error.serverError);
module.exports = router;
