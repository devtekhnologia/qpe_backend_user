import { Request, Response } from "express";
import RoleModel, { roleSchemaValidation } from "./roleModel";

/**
 * Add a new role to the database if it doesn't exist.
 */
export const addRole = async (req: Request, res: Response) => {
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
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
