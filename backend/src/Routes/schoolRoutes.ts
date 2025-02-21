// import express from "express";
// import { SchoolController } from "../Controllers/schoolController";

// const router = express.Router();
// const schoolController = new SchoolController();

// router.post("/schools", schoolController.createSchool);
// router.get("/schools", schoolController.getSchools);
// // router.get("/schools/:id", schoolController.getSchoolById);
// router.put("/schools/:id", schoolController.updateSchool);
// router.delete("/schools/:id", schoolController.deleteSchool);

// export default router;

import express from "express";
import { SchoolController } from "../Controllers/schoolController";

const router = express.Router();

// router.post("/addschool", (req, res) => SchoolController.createSchool(req, res));
// router.post("/addschool", async (req, res) => SchoolController.createSchool(req, res));
router.post("/addschool", async (req, res, next) => {
    try {
      await SchoolController.createSchool(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });
  router.get("/getschools/:id", async (req, res, next) => {
    try {
      await SchoolController.getSchools(req, res);
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  });
// router.get("/getschools/:id", (req, res) => SchoolController.getSchools(req, res));
// router.get("/schools/:id", (req, res) => schoolController.getSchoolById(req, res));
// router.put("/schools/", (req, res) => SchoolController.updateSchool(req, res));
router.delete("/schools/:id", (req, res) => SchoolController.deleteSchool(req, res));

export default router;
