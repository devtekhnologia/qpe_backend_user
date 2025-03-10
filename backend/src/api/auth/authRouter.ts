import { Router } from "express";
import authController from "./authController";
import { handleServiceResponse } from "../../utils/response";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { adminRequestSchema, loginRequestSchema, userRequestSchema } from "./authModel";
import { checkJWT } from "../../middlewares/checkJwt";

export const authRouter = (() => {
    const router = Router();

    router.post('/register-admin', validateRequest(adminRequestSchema), async (req, res) => {
        const response = await authController.registerAdmin(req);
        handleServiceResponse(response, res);
    })

    router.post("/register-user", validateRequest(userRequestSchema), checkJWT, async (req, res) => {
        const response = await authController.registerUser(req);
        handleServiceResponse(response, res);
    });

    router.post('/login', validateRequest(loginRequestSchema), async (req, res) => {
        const response = await authController.login(req);
        handleServiceResponse(response, res);
    })

    router.post("/refresh-token", async (req, res) => {
        const response = await authController.refreshToken(req);
        handleServiceResponse(response, res);
    })

    return router;
})();