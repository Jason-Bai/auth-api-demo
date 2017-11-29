const Joi = require('joi');

module.exports = {
  authSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}