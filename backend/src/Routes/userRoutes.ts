import { Router } from "express";
import { UserController } from "../Controllers/userController"; // ✅ Ensure the correct path

const router = Router();

router.post("/register", UserController.register); // ✅ This should work now

export default router;





