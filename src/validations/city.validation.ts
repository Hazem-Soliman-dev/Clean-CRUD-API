import Joi from "joi";

export const cityValidationSchema = Joi.object({
  name: Joi.string().required(),
  stateId: Joi.number().required(),
});

export const updateCityValidationSchema = Joi.object({
  name: Joi.string().optional(),
  stateId: Joi.number().optional(),
}).or("name", "stateId");
