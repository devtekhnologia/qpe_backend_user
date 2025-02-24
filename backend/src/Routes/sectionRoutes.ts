import express from "express";
import { sectionController } from "../Controllers/sectionController";

const router = express.Router();

router.post("/addSection", sectionController.createSection);

export default router;