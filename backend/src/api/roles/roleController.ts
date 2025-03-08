import { Request } from "express";
import RoleModel from "./roleModel";
import { getEpochTime } from "../../utils/epochTime";
import { ServiceResponse } from "../../utils/response";

export const roleController = {
  addRole: async (req: Request): Promise<ServiceResponse> => {
    try {
      const { name } = req.body;
      
      // Check if role already exists
      const existingRole = await RoleModel.findOne({ name });
      if (existingRole) {
        existingRole.updatedAt = getEpochTime();
        await existingRole.save();
        return ServiceResponse.success("Role already exists", existingRole);
      }

      // Create and save new role
      const newRole = new RoleModel({
        name,
        createdAt: getEpochTime(),
        updatedAt: getEpochTime(),
      });
      await newRole.save();

      return ServiceResponse.success("Role added successfully", newRole);
    } catch (error) {
      return ServiceResponse.internalServerError(`Error adding role: ${error}`);
    }
  },

  getAllRoles: async (): Promise<ServiceResponse> => {
    try {
      const allRoles = await RoleModel.find();

      if (allRoles.length === 0) {
        return ServiceResponse.success("No roles found");
      }

      return ServiceResponse.success("Roles fetched successfully", allRoles);
    } catch (error: any) {
      return ServiceResponse.internalServerError(`Error fetching roles: ${error.message}`);
    }
  },
};

