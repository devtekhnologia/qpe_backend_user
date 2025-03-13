import express, { Router } from "express";
import { classController } from "./classController";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { handleServiceResponse } from "../../utils/response";
import { createSchema, idSchema, updateSchema } from "./classModel";

export const classRouter: Router = (() => {
    const router = express.Router();

    // Add a new class
    router.post("/add", validateRequest(createSchema), async (req, res) => {
        const response = await classController.create(req);
        handleServiceResponse(response, res);
    });

    // Get all classes
    router.get("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await classController.fetch(req);
        handleServiceResponse(response, res);
    });

    // update the existing class
    router.put("/update", validateRequest(updateSchema), async (req, res) => {
        const response = await classController.update(req);
        handleServiceResponse(response, res);
    });

    // delete class
    router.delete("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await classController.delete(req);
        handleServiceResponse(response, res);
    });

    return router;
})();