const Joi = require("joi");

//Create Category Validation
const addCategoryValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

//Update Category Validation
const updateCategoryValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.addCategoryValidation = addCategoryValidation;
module.exports.updateCategoryValidation = updateCategoryValidation;
