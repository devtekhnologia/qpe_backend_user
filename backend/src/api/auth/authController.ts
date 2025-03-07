import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ServiceResponse } from "../../utils/response";
import authService from "./authService";
import RoleModel from "../roles/roleModel";

export const authController = {
  registerAdmin: async (req: Request): Promise<any | void> => {
    try {
      const { name, email, password, school_name, school_registration_id } = req.body;
      const admin: any = await RoleModel.findOne({ name: "Admin" });
      const admin_id = admin._id;

      const result = await authService.createAdmin({
        name,
        email,
        password,
        role_id: admin_id,
        school_name,
        school_registration_id,
      });

      return result
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  login: async (req: Request): Promise<any | void> => {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });

      return ServiceResponse.success("Login successful", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  refreshToken: async (req: Request): Promise<any | void> => {
    try {
      const { refresh_token } = req.body;
      const result = await authService.refreshAccessToken(refresh_token);

      return ServiceResponse.success("Access token refreshed", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },
};

export default authController;
