import express from "express";

import { createSchoolSchema, updateSchema } from "../../schema/commonSchema";
import { SchoolController } from "./schoolController";
import { validateRequest } from "../../middlewares/validateMiddleware";

const router = express.Router();

router.post("/addSchool", validateRequest(createSchoolSchema), SchoolController.createSchool);
router.get("/getSchools/:id", SchoolController.getSchools);
router.put("/updateSchool", validateRequest(updateSchema), SchoolController.updateSchool);
router.delete("/deleteSchool/:id", SchoolController.deleteSchool);

export default router;