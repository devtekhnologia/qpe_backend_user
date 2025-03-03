import express from "express";
import { sectionController } from "../../controllers/sectionController";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { createSchema, updateSchema } from "../../Schema/commonSchema";

const router = express.Router();

router.post("/addSection", validateRequest(createSchema), sectionController.createSection);
router.get("/getSection/:id", sectionController.getSection);
router.put("/updateSection", validateRequest(updateSchema), sectionController.updateSection);
router.delete("/deleteSection/:id", sectionController.deleteSection);

export default router;