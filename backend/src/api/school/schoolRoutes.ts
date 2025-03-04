import express from "express";

import { createSchoolSchema, idSchema, updateSchema } from "../../schema/commonSchema";
import { SchoolController } from "./schoolController";
import { validateRequest } from "../../middlewares/validateMiddleware";

const router = express.Router();

router.post("/addSchool", validateRequest(createSchoolSchema), SchoolController.createSchool);
router.get("/getSchools/:id", validateRequest(idSchema), SchoolController.getSchools);
router.put("/updateSchool", validateRequest(updateSchema), SchoolController.updateSchool);
router.delete("/deleteSchool/:id", validateRequest(idSchema), SchoolController.deleteSchool);

export default router;