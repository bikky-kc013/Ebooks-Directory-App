const joi = require("joi");

const validateSchema = joi.object({
  bookName: joi.string().required(),
  price: joi.number().required(),
  rating: joi.number().required(),
});

module.exports = { validateSchema };
