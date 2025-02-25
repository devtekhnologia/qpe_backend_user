import express from "express";
import { validateRequest } from "../../Middlewares/validateMiddleware";
import { createClassroomSchema, updateClassroomSchema } from "../../Schema/commonSchema";
import { classroomController } from "../../Controllers/classroomController";

const router = express.Router();

router.post("/addclassroom", validateRequest(createClassroomSchema), classroomController.createClassroom);
router.get("/getClassroom/:id", classroomController.getClassroom);
router.put("/updateclassroom", validateRequest(updateClassroomSchema), classroomController.updateclassroom);
router.delete("/deleteClassroom/:id", classroomController.deleteClassroom);
router.get("/getClassroomSubjects/:id", classroomController.getClassroomSubjects);

export default router;