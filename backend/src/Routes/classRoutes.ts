import express from "express";
import { classController } from "../Controllers/classController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createClassNameSchema } from "../Schema/commonSchema";

const router = express.Router();

router.post("/addClassname", validateRequest(createClassNameSchema), classController.createClassName);
router.get("/getSchools/:id", classController.getClassName);
router.put("/updateSchool", classController.updateClassName);
router.delete("/deleteSchool/:id", classController.deleteClassName);

export default router;