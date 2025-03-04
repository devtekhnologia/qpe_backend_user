import express from "express";
import { createClassroomSchema, updateClassroomSchema } from "../../schema/commonSchema";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { classroomController } from "./classroomController";

const router = express.Router();

router.post("/addclassroom", validateRequest(createClassroomSchema), classroomController.createClassroom);
router.get("/getClassroom/:id", classroomController.getClassroom);
router.put("/updateclassroom", validateRequest(updateClassroomSchema), classroomController.updateclassroom);
router.delete("/deleteClassroom/:id", classroomController.deleteClassroom);
router.get("/getClassroomSubjects/:id", classroomController.getClassroomSubjects);

export default router;