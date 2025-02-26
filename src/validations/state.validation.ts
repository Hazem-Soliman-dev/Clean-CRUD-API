import Joi from "joi";

export const stateValidationSchema = Joi.object({
  name: Joi.string().required(),
  countryId: Joi.number().required(),
});

export const updateStateValidationSchema = Joi.object({
  name: Joi.string().optional(),
  countryId: Joi.number().optional(),
}).or("name", "countryId");
