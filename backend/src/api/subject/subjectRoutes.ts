import express, { Router } from "express";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { subjectController } from "./subjectController";
import { createSchema, idSchema, updateSchema } from "./subjectModel";
import { handleServiceResponse } from "../../utils/response";

export const subjectRouter: Router = (() => {
    const router = express.Router();

    // Add a new class
    router.post("/add", validateRequest(createSchema), async (req, res) => {
        const response = await subjectController.create(req);
        handleServiceResponse(response, res);
    });

    // Get all classes
    router.get("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await subjectController.fetch(req);
        handleServiceResponse(response, res);
    });

    // update the existing class
    router.put("/update", validateRequest(updateSchema), async (req, res) => {
        const response = await subjectController.update(req);
        handleServiceResponse(response, res);
    });

    // delete class
    router.delete("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await subjectController.delete(req);
        handleServiceResponse(response, res);
    });

    return router;
})();