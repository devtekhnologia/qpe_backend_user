import express, { Router } from "express";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { classroomController } from "./classroomController";
import { createSchema, idSchema, updateSchema } from "./classroomModel";
import { handleServiceResponse } from "../../utils/response";

export const classroomRouter: Router = (() => {
    const router = express.Router();

    // Add classroom
    router.post("/add", validateRequest(createSchema), async (req, res) => {
        const response = await classroomController.create(req);
        handleServiceResponse(response, res);
    });

    // Get all classrooms
    router.get("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await classroomController.fetch(req);
        handleServiceResponse(response, res);
    });

    // Update existing classroom
    router.put("/update", validateRequest(updateSchema), async (req, res) => {
        const response = await classroomController.update(req);
        handleServiceResponse(response, res);
    });

    // Delete classroom
    router.delete("/:id", validateRequest(idSchema), async (req, res) => {
        const response = await classroomController.delete(req);
        handleServiceResponse(response, res);
    });

    // Get all classrooms
    router.get("/getClassroomSubjects/:id", validateRequest(idSchema), async (req, res) => {
        const response = await classroomController.getClassroomSubjects(req);
        handleServiceResponse(response, res);
    });

    return router;
})();