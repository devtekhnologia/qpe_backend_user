import express, { Request, Response, Router } from "express";
import RoleModel, { roleSchemaValidation } from "./roleModel";

export const roleRouter: Router = (() => {
    const router = express.Router();

 // Add a new role to the database
    router.post("/add", async (req: Request, res: Response): Promise<any> => {
        try {
            // Validate request body using Zod
            const { name } = roleSchemaValidation.parse(req.body);

            // Check if role already exists
            const existingRole = await RoleModel.findOne({ name });
            if (existingRole) {
                return res.status(400).json({ message: "Role already exists" });
            }

            // Create and save new role
            const newRole = new RoleModel({ name });
            await newRole.save();

            return res.status(201).json({ message: "Role added successfully", role: newRole });
        } catch (error) {
            console.error("Error adding role:", error);
            return res.status(500).json({ error: "Internal Server Error", details: error });
        }
    });

    return router;
})();
