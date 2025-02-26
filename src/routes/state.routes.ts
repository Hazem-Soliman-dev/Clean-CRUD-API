import { Router, RequestHandler } from "express";
import {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from "../controllers/state.controller";
import { validateParams, validate } from "../middleware/validate";
import { stateValidationSchema, updateStateValidationSchema } from "../validations/state.validation";
import { idValidationSchema } from "../validations/id.validation";
const router = Router();

router.get("/", getAllStates as RequestHandler);

router.get(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  getStateById as RequestHandler
);

router.post(
  "/",
  validate(stateValidationSchema) as RequestHandler,
  createState as RequestHandler
);

router.patch(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  validate(updateStateValidationSchema) as RequestHandler,
  updateState as RequestHandler
);

router.delete(
  "/:id",
  validateParams(idValidationSchema) as RequestHandler,
  deleteState as RequestHandler
);

export default router;
