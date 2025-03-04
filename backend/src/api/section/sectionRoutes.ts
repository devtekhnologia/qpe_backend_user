import express from "express";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { createSchema, idSchema, updateSchema } from "../../schema/commonSchema";
import { sectionController } from "./sectionController";

const router = express.Router();

router.post("/addSection", validateRequest(createSchema), sectionController.createSection);
router.get("/getSection/:id", validateRequest(idSchema), sectionController.getSection);
router.put("/updateSection", validateRequest(updateSchema), sectionController.updateSection);
router.delete("/deleteSection/:id", validateRequest(idSchema), sectionController.deleteSection);

export default router;
