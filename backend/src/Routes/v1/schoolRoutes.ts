import express from "express";
import { SchoolController } from "../../controllers/schoolController";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { createSchoolSchema, updateSchema } from "../../Schema/commonSchema";

const router = express.Router();

router.post("/addSchool", validateRequest(createSchoolSchema), SchoolController.createSchool);
router.get("/getSchools/:id", SchoolController.getSchools);
router.put("/updateSchool", validateRequest(updateSchema), SchoolController.updateSchool);
router.delete("/deleteSchool/:id", SchoolController.deleteSchool);

export default router;