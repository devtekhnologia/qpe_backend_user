import express from "express";
import { createSchema, updateSchema } from "../../schema/commonSchema";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { subjectController } from "./subjectController";

const router = express.Router();

router.post("/addSubject", validateRequest(createSchema), subjectController.createSubject);
router.get("/getSubject/:id", subjectController.getSubject);
router.put("/updateSubject", validateRequest(updateSchema), subjectController.updateSubject);
router.delete("/deleteSubject/:id", subjectController.deleteSubject);

export default router;