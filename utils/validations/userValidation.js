const Joi = require("joi");

//Registration Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

//Create User Validation
const createUserValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    userName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.number(),
    gender: Joi.string(),
    dateOfBirth: Joi.date(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    status: Joi.string(),
    address: Joi.string(),
  });
  return schema.validate(data);
};

//Update User Validation
const updateUserValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.number(),
    gender: Joi.string(),
    dateOfBirth: Joi.date(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    status: Joi.string(),
    address: Joi.string(),
    photo: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUserValidation = updateUserValidation;
module.exports.createUserValidation = createUserValidation;
