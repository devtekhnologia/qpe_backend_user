import express from "express";
import { subjectController } from "../../controllers/subjectController";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { createSchema, updateSchema } from "../../Schema/commonSchema";

const router = express.Router();

router.post("/addSubject", validateRequest(createSchema), subjectController.createSubject);
router.get("/getSubject/:id", subjectController.getSubject);
router.put("/updateSubject", validateRequest(updateSchema), subjectController.updateSubject);
router.delete("/deleteSubject/:id", subjectController.deleteSubject);

export default router;