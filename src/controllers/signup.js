const Joi = require('joi');
const { addUser } = require('../database/queries/addData');
const hashPassword = require('../helpers/hashPass');
const { signUpSchema } = require('../helpers/validation-schemes');
const { checkMobile, checkEmail, sections } = require('../database/queries/getData');

exports.get = (req, res) => {
  sections().then((secResult) => {
    res.render('signup', {
      layout: 'login_signup',
      title: 'signup',
      js: ['helpers/collectData', 'signup'],
      css: ['signup'],
      sectionResult: secResult.rows,
    });
  }).catch(() => {
    res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
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
    checkEmail(userInfo.email)
      .then((result) => {
        if (result.rows[0]) {
          res.status(400).send(JSON.stringify({ Error: ` This Email :  ${result.rows[0].email} is already register` }));
        } else {
          checkMobile(userInfo.mobile_number.trim())
            .then((resultno) => {
              if (resultno.rows[0]) {
                res.status(400).send(JSON.stringify({ Error: ` This number :  ${resultno.rows[0].mobile_number} is already register` }));
              } else {
                hashPassword(userInfo.password)
                  .then((hashedPass) => {
                    userInfo.password = hashedPass;
                    addUser(userInfo)
                      .then(() => {
                        res.status(201).send(JSON.stringify({ success: 'Regestration success ...', user: { ...user.firstSection } }));
                      })
                      .catch(() => {
                        res.status(400).send(JSON.stringify({ Error: 'Bad Request ...' }));
                      });
                  });
              }
            }).catch(() => {
              res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
            });
        }
      }).catch(() => {
        res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
      });
  } else {
    res.status(400).send(JSON.stringify({ Error: 'Bad Request' }));
  }
};
