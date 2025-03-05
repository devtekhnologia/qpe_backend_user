import { Router } from "express";
import authController from "./authController";
import { handleServiceResponse } from "../../utils/response";

export const authRouter = (() => {
    const router = Router();

    router.post('/register', async (req, res) => {
        const response = await authController.register(req);
        handleServiceResponse(response, res);
    })

    return router;
})();

//router.post("/registerAdmin", validateRequest(registerAdminSchema), UserController.registerAdmin);

//router.post("/registerUser", validateRequest(registerUserSchema), UserController.registerUser);

//router.post("/login", UserController.login);



