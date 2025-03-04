import express, { Router } from "express";
import { roleController } from "./roleController";
import { roleRequestSchema } from "./roleModel";
import { validateRequest } from "../../middlewares/validateMiddleware";

export const roleRouter: Router = (() => {
  const router = express.Router();

  // Add a new role to the database
  router.post("/add", validateRequest(roleRequestSchema), roleController.addRole);

  return router;
})();
