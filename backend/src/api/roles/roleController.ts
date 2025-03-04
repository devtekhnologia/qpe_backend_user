import { Request, Response } from "express";
import RoleModel from "./roleModel";
import { getEpochTime } from "../../utils/epochTime";

export const roleController = {
    addRole: async (req: Request, res: Response): Promise<any> => {
        try {
            const { name } = req.body;
            // Check if role already exists
            const existingRole = await RoleModel.findOne({ name });
            if (existingRole) {
                // If role exists, update `updatedAt` field
                existingRole.updatedAt = getEpochTime();
                await existingRole.save();
                return res.status(200).json({ message: "Role already exists, updated timestamp", role: existingRole });
            }

            // Create and save new role with epoch timestamps
            const newRole = new RoleModel({
                name,
                createdAt: getEpochTime(),
                updatedAt: getEpochTime(),
            });
            await newRole.save();

            return res.status(201).json({ message: "Role added successfully", role: newRole });
        } catch (error) {
            console.error("Error adding role:", error);
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};
