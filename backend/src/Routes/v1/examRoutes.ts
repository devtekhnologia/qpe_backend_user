import express from "express";
import { ExamController } from "../../Controllers/examController";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { createSchema, updateSchema } from "../../Schema/commonSchema";

const router = express.Router();

router.post("/addExam", validateRequest(createSchema), ExamController.createExam);
router.get("/getExam/:id", ExamController.getExam);
router.put("/updateExam", validateRequest(updateSchema), ExamController.updateExam);
router.delete("/deleteExam/:id", ExamController.deleteExam);

export default router;