import express, { Request, Response, Router } from "express";
import { userController } from "./userController";

export const userRouter: Router = (() => {
    const router = express.Router();

    router.get("/registerUser", async (req: Request, res: Response): Promise<any> => {
        try {
            const response = await userController.register(req, res);
            return res.json(response); 
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
})();
