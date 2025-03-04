import { Router } from "express";



import { registerUserSchema,registerAdminSchema} from "../../schema/userSchema"; 
import { validateRequest } from "../../middlewares/validateMiddleware";
import UserController from "./userController";

const router = Router();

router.post("/registerAdmin", 
    //validateRequest(registerAdminSchema), 
    UserController.registerAdmin);

//router.post("/registerUser", validateRequest(registerUserSchema), UserController.registerUser);

router.post("/login", UserController.login);

export default router;


