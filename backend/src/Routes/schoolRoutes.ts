import express from "express";
import { SchoolController } from "../Controllers/schoolController";

const router = express.Router();

router.post("/addSchool", async (req, res, next) => {
    try {
      await SchoolController.createSchool(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });
  router.get("/getSchools/:id", async (req, res, next) => {
    try {
      await SchoolController.getSchools(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });
  router.put("/updateSchool/", async (req, res, next) => {
    try {
      await SchoolController.updateSchool(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });
  router.post("/deleteschool/:id", async (req, res, next) => {
    try {
      await SchoolController.deleteSchool(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });

export default router;
