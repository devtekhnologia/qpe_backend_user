import { Router } from "express";
import authController from "./authController";
import { handleServiceResponse } from "../../utils/response";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { adminRequestSchema, userRequestSchema } from "./authModel";

export const authRouter = (() => {
    const router = Router();

    router.post('/register-admin', validateRequest(adminRequestSchema), async (req, res) => {
        const response = await authController.registerAdmin(req);
        handleServiceResponse(response, res);
    })

    return router;
})();

//router.post("/registerAdmin", validateRequest(registerAdminSchema), UserController.registerAdmin);

//router.post("/registerUser", validateRequest(registerUserSchema), UserController.registerUser);

//router.post("/login", UserController.login);



