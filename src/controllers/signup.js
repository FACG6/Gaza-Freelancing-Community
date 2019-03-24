const Joi = require('joi');
const { addUser } = require('../database/queries/addData');
const hashPassword = require('../helpers/hashPass');
const { signUpSchema } = require('../helpers/validation-schemes');
const { checkMobile, checkEmail } = require('../database/queries/getData');

exports.get = (req, res) => {
  res.render('signup', {
    layout: 'login_signup',
    title: 'signup ',
    js: ['helpers/collectData', 'helpers/singnupFunctions', 'signup'],
    css: ['signup'],
  });
};

exports.post = (req, res) => {
  const user = req.body;
  const userInfo = {
    ...user.firstSection,
    ...user.secondSection,
    ...user.thirdSection,
  };
  const { error } = Joi.validate(userInfo, signUpSchema);
  if (!error) {
    checkEmail(userInfo.email.trim())
      .then((result) => {
        if (result.rows[0]) {
          res.status(400).send({ Error: ` This Email :  ${result.rows[0].email} is already register` });
        } else {
          return checkMobile(userInfo.mobile_number.trim());
        }
      }).then((resultmobile) => {
        if (resultmobile.rows[0]) {
          res.status(400).send({ Error: ` This Mobile :  ${resultmobile.rows[0].mobile_number} is already register` });
        } else {
          return hashPassword(userInfo.password.trim());
        }
      }).then((hashedPass) => {
        userInfo.password = hashedPass;
        return addUser(userInfo);
      })
      .then(() => {
        res.status(201).send({ success: 'Regestration success ...', user: { ...user.firstSection } });
      })
      .catch((err) => {
        res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
      });
  } else {
    res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
  }
};
