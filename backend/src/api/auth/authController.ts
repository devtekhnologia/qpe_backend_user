import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ServiceResponse } from "../../utils/response";
import authService from "./authService";
import RoleModel from "../roles/roleModel";
import UserModel from "./authModel";

export const authController = {
  registerAdmin: async (req: Request): Promise<any | void> => {
    try {
      const { name, email, password, school_name, reg_id } = req.body;

      const admin: any = await RoleModel.findOne({ name: "Admin" });
      const admin_id = admin._id;
      const role_name = admin.name

      const result = await authService.createAdmin({
        name,
        email,
        password,
        role_id: admin_id,
        role_name: role_name,
        school_name,
        reg_id,
      });

      return result
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  registerUser: async (req: Request): Promise<any | void> => {
    try {
      const { name, email, password, role_name, school_name } = req.body;
      const { user_id, reg_id } = req.client;
      console.log("req.client", req.client)

      // Check if the user registering is an Admin
      const admin: any = await UserModel.findById(user_id);
      if (!admin || admin.role_name !== "Admin") {
        return ServiceResponse.unauthorized("Not authorized");
      }

      // Check if the role exists
      const role: any = await RoleModel.findOne({ name: role_name });
      if (!role) {
        return ServiceResponse.badRequest("Invalid role");
      }
      const role_id = role._id;

      const result = await authService.createUser({
        name,
        email,
        password,
        role_id,
        role_name,
        school_name,
        reg_id,
        created_by: user_id
      })
      return result;

    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  login: async (req: Request): Promise<any | void> => {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });

      return result;
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  refreshToken: async (req: Request): Promise<any | void> => {
    try {
      const authHeader: any = req.header("Authorization");
      if (!authHeader) {
        return ServiceResponse.unauthorized("No refresh token provided")
      }
      const token = authHeader.replace("Bearer ", "");
      const result = await authService.refreshAccessToken(token);

      return ServiceResponse.success("Access token refreshed", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },
};

export default authController;