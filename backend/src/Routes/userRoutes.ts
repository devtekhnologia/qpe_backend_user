import { Router } from "express";
import {UserController} from "../Controllers/userController"; // ✅ No need to import as a class

// const router = Router();
// import UserController from "../Controllers/userController"; // ✅ Correct way for default export

const router = Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;







