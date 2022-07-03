const Joi = require("joi");

//Create Language Validation
const addLanguageValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

//Update Language Validation
const updateLanguageValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.addLanguageValidation = addLanguageValidation;
module.exports.updateLanguageValidation = updateLanguageValidation;
