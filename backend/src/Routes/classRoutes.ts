import express from "express";
import { classController } from "../Controllers/classController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createClassNameSchema, updateClassNameSchema } from "../Schema/commonSchema";

const router = express.Router();

router.post("/addClassname", validateRequest(createClassNameSchema), classController.createClassName);
router.get("/getClassname/:id", classController.getClassName);
router.put("/updateClassname", validateRequest(updateClassNameSchema), classController.updateClassName);
router.delete("/deleteClassname/:id", classController.deleteClassName);

export default router;