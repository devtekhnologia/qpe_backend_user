import express from "express";
import { createClassroomSchema, idSchema, updateClassroomSchema } from "../../schema/commonSchema";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { classroomController } from "./classroomController";

const router = express.Router();

router.post("/addclassroom", validateRequest(createClassroomSchema), classroomController.createClassroom);
router.get("/getClassroom/:id", validateRequest(idSchema), classroomController.getClassroom);
router.put("/updateclassroom", validateRequest(updateClassroomSchema), classroomController.updateclassroom);
router.delete("/deleteClassroom/:id", validateRequest(idSchema), classroomController.deleteClassroom);
router.get("/getClassroomSubjects/:id", validateRequest(idSchema), classroomController.getClassroomSubjects);

export default router;