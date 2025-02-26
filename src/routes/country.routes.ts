import { Router, RequestHandler } from "express";
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/country.controller";
import { validate, validateParams } from "../middleware/validate";
import { countryValidationSchema } from "../validations/country.validation";
import { idValidationSchema } from "../validations/id.validation";
import upload from "../utils/multer";

const router = Router();

router.get("/", getAllCountries as RequestHandler);

router.get(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  getCountryById as RequestHandler
);

router.post(
  "/",
  upload.single("flag"),
  validate(countryValidationSchema) as RequestHandler,
  createCountry as RequestHandler
);

router.patch(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  upload.single("flag"),
  validate(countryValidationSchema) as RequestHandler,
  updateCountry as RequestHandler
);

router.delete(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  deleteCountry as RequestHandler
);

export default router;
