import express from "express";
import { SchoolController } from "../Controllers/schoolController";
import { validateRequest } from "../Middlewares/validateMiddleware";
import { createSchoolSchema, deleteSchoolsSchema, getSchoolsSchema, updateSchoolSchema } from "../Schema/schoolSchema"; 

const router = express.Router();

router.post("/addSchool", validateRequest(createSchoolSchema), SchoolController.createSchool);
router.get("/getSchools/:id", SchoolController.getSchools);
router.put("/updateSchool", validateRequest(updateSchoolSchema), SchoolController.updateSchool);
router.delete("/deleteSchool/:id", SchoolController.deleteSchool);

export default router;