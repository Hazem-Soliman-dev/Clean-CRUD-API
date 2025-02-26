import Joi from "joi";

export const idValidationSchema = Joi.object({
  id: Joi.number().required(),
});

