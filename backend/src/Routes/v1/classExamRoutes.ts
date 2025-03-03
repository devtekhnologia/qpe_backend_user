import express from "express";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { createClassExamSchema, updateClassExamSchema } from "../../Schema/commonSchema";
import { classExamController } from "../../controllers/classExamController";

const router = express.Router();

router.post("/addClassExam", validateRequest(createClassExamSchema), classExamController.createClassExam);
router.get("/getClassExam/:id", classExamController.getClassExam);
router.put("/updateClassExam", validateRequest(updateClassExamSchema), classExamController.updateClassexam);
router.delete("/deleteClassExam/:id", classExamController.deleteClassExam);

export default router;