const joi = require('joi');

exports.signUpSchema = joi.object().keys({
  firstname: joi.string().alphanum().min(3).max(30)
    .required(),
  lastname: joi.string().alphanum().min(3).max(30)
    .required(),
  mobile_number: joi.string().required(),
  email: joi.string().email({
    minDomainAtoms: 2,
  }).required(),
  specalization_id: joi.number().integer().required(),
  freelancer_url: joi.string().regex(/http(s)?:\/\/([\w]+\.)?[A-z0-9_-]+\.com\/[A-z0-9_-]+/).required(),
  photo_url: joi.string().regex(/^https?:\/\/([\w]||[-_.])+\.[a-z]{2,4}(\/||[\w-_])*\.(png|jpe?g||gif)$/).required(),
  password: joi.string().required(),
});
