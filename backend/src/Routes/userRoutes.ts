




import { Router } from "express";
import { UserController } from "../Controllers/userController";
import { validateRequest } from "../Middlewares/validateMiddleware";


import { registerUserSchema } from "../Schema/userSchema"; 

const router = Router();

router.post("/register", validateRequest(registerUserSchema), UserController.register);
router.post("/login", UserController.login);

export default router;



