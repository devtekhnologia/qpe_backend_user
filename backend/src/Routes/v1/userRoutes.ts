import { Router } from "express";
import { UserController } from "../../controllers/userController";
import { validateRequest } from "../../middlewares/validateMiddleware";


import { registerUserSchema,registerAdminSchema} from "../../Schema/userSchema"; 

const router = Router();

router.post("/registerAdmin", 
    //validateRequest(registerAdminSchema), 
    UserController.registerAdmin);

router.post("/registerUser", validateRequest(registerUserSchema), UserController.registerUser);

router.post("/login", UserController.login);

export default router;


