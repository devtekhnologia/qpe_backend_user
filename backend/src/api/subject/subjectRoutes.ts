import express from "express";
import { createSchema, idSchema, updateSchema } from "../../schema/commonSchema";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { subjectController } from "./subjectController";

const router = express.Router();

router.post("/addSubject", validateRequest(createSchema), subjectController.createSubject);
router.get("/getSubject/:id", validateRequest(idSchema), subjectController.getSubject);
router.put("/updateSubject", validateRequest(updateSchema), subjectController.updateSubject);
router.delete("/deleteSubject/:id", validateRequest(idSchema), subjectController.deleteSubject);

export default router;