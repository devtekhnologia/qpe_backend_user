import express from "express";
import { classController } from "../Controllers/classController";

const router = express.Router();

router.post("/addClassname", classController.createClassName);
router.get("/getSchools/:id", classController.getClassName);
router.put("/updateSchool", classController.updateClassName);
router.delete("/deleteSchool/:id", classController.deleteClassName);

export default router;