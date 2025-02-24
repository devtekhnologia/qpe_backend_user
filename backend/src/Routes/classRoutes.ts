import express from "express";
import { classController } from "../Controllers/classController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createSchema, updateSchema } from "../Schema/commonSchema";

const router = express.Router();

router.post("/addClassname", validateRequest(createSchema), classController.createClassName);
router.get("/getClassname/:id", classController.getClassName);
router.put("/updateClassname", validateRequest(updateSchema), classController.updateClassName);
router.delete("/deleteClassname/:id", classController.deleteClassName);

export default router;