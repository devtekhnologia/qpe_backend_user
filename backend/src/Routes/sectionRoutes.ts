import express from "express";
import { sectionController } from "../Controllers/sectionController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createSectionSchema, updateSectionSchema } from "../Schema/commonSchema";

const router = express.Router();

router.post("/addSection", validateRequest(createSectionSchema), sectionController.createSection);
router.get("/getSection/:id", sectionController.getSection);
router.put("/updateSection", validateRequest(updateSectionSchema), sectionController.updateSection);
router.delete("/deleteSection/:id", sectionController.deleteSection);

export default router;