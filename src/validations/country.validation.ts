import Joi from "joi";

export const countryValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  flag: Joi.string().uri().optional()
});