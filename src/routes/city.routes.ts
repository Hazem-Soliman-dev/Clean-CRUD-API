import { Router, RequestHandler } from "express";
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} from "../controllers/city.controller";
import { validate, validateParams } from "../middleware/validate";
import { cityValidationSchema, updateCityValidationSchema } from "../validations/city.validation";
import { idValidationSchema } from "../validations/id.validation";

const router = Router();

router.get("/", getAllCities as RequestHandler);

router.get(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  getCityById as RequestHandler
);

router.post(
  "/",
  validate(cityValidationSchema) as RequestHandler,
  createCity as RequestHandler
);

router.patch(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  validate(updateCityValidationSchema) as RequestHandler,
  updateCity as RequestHandler
);

router.delete(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  deleteCity as RequestHandler
);

export default router;
