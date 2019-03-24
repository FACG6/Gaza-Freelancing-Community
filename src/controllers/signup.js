const joi = require('joi');
const { addUser } = require('../database/queries/addData');
const hashPassword = require('../helpers/hashPass');
const { signUpSchema } = require('../helpers/validation-schemes');
const { checkMobile, checkEmail, getCategories } = require('../database/queries/getData');

exports.get = (req, res) => {
  getCategories()
    .then(({ rows: categories }) => res.render('signup', {
      categories,
      layout: 'login_signup',
      title: 'Sign Up',
      js: ['helpers/collectData', 'helpers/signup', 'signup'],
      css: ['signup'],
    }))
    .catch(() => res.status(400).send({ Error: 'Bad Request' }));
};

exports.post = (req, res) => {
  const user = req.body;
  const userInfo = {
    ...user.firstSection,
    ...user.secondSection,
    ...user.thirdSection,
  };
  const { error } = joi.validate(userInfo, signUpSchema);
  if (!error) {
    checkEmail(userInfo.email)
      .then(({ rows: emailUsed }) => {
        if (emailUsed[0]) throw new Error('Email Used');
        else return checkMobile(userInfo.mobile_number);
      })
      .then(({ rows: mobileUsed }) => {
        if (mobileUsed[0]) throw new Error('Mobile Used');
        else return hashPassword(userInfo.password);
      })
      .then(hashedPass => addUser({ ...userInfo, password: hashedPass }))
      .then(() => res.status(201).send({
        success: 'Regestration success ...',
        user: { ...user.firstSection },
      }))
      .catch(() => res.status(400).send({ Error: 'Already Used' }));
  } else {
    res.status(400).send({ Error: 'Bad Request' });
  }
};
