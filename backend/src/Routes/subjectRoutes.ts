import express from "express";
import { subjectController } from "../Controllers/subjectController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createSubjectSchema, updateSubjectSchema } from "../Schema/commonSchema";

const router = express.Router();

router.post("/addSubject", validateRequest(createSubjectSchema), subjectController.createSubject);
router.get("/getSubject/:id", subjectController.getSubject);
router.put("/updateSubject", validateRequest(updateSubjectSchema), subjectController.updateSubject);
router.delete("/deleteSubject/:id", subjectController.deleteSubject);

export default router;