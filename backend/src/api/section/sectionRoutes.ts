import express, { Router } from "express";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { sectionController } from "./sectionController";
import { createSchema, idSchema, updateSchema } from "./sectionModel";
import { handleServiceResponse } from "../../utils/response";

export const sectionRouter: Router = (() => {
    const router = express.Router();

    // Add a new section
    router.post("/add", validateRequest(createSchema), async (req, res) => {
        const response = await sectionController.create(req);
        handleServiceResponse(response, res);
    });

    // Get all sections
    router.get("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await sectionController.fetch(req);
        handleServiceResponse(response, res);
    });

    // update the existing section
    router.put("/update", validateRequest(updateSchema), async (req, res) => {
        const response = await sectionController.update(req);
        handleServiceResponse(response, res);
    });

    // delete section
    router.delete("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await sectionController.delete(req);
        handleServiceResponse(response, res);
    });

    return router;
})();
