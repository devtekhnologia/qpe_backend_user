import express, { Router } from "express";
import { roleRequestSchema } from "./roleModel";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { handleServiceResponse } from "../../utils/response";
import { roleController } from "./roleController";

export const roleRouter: Router = (() => {
  const router = express.Router();

  // Add a new role to the database
  router.post("/add", validateRequest(roleRequestSchema), async (req, res) => {
    const response = await roleController.addRole(req);
    handleServiceResponse(response, res);
  });

  // Get all roles from the database
  router.get("/getAll", async (req, res) => {
    const response = await roleController.getAllRoles();
    handleServiceResponse(response, res);
  });

  return router;
})();
