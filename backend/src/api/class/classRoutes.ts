import express from "express";
import { classController } from "./classController";
import { createSchema, idSchema, updateSchema } from "../../schema/commonSchema";
import { validateRequest } from "../../middlewares/validateMiddleware";

const router = express.Router();

router.post("/addClassname", validateRequest(createSchema), classController.createClassName);
router.get("/getClassname/:id", validateRequest(idSchema), classController.getClassName);
router.put("/updateClassname", validateRequest(updateSchema), classController.updateClassName);
router.delete("/deleteClassname/:id", validateRequest(idSchema), classController.deleteClassName);

export default router;