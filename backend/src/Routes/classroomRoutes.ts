import express from "express";
import { classController } from "../Controllers/classController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createClassroomSchema, updateClassroomSchema } from "../Schema/commonSchema";
import { classroomController } from "../Controllers/classroomController";

const router = express.Router();

router.post("/addclassroom", validateRequest(createClassroomSchema), classroomController.createclassroom);
router.get("/getClassroom/:id", classroomController.getClassroom);
router.put("/updateclassroom", validateRequest(updateClassroomSchema), classroomController.updateclassroom);
router.delete("/deleteClassroom/:id", classroomController.deleteClassroom);

export default router;