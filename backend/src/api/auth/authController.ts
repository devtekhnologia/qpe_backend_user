import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ServiceResponse } from "../../utils/response";
import authService from "./authService";

export const authController = {
  register: async (
    req: Request,
  ): Promise<any | void> => {
    try {
      const { name, email, password, school_name, role_id } = req.body;
      console.log("bodddddyyyyyyyyy", req.body);
      const user_id = new mongoose.Types.ObjectId("5f92cbf10cf217478ba93561");
      const result = await authService.registerAdmin({
        name,
        email,
        password,
        school_name,
        role_id,
        user_id,
      });

      // Otherwise, return success response
      return ServiceResponse.created("User registered successfully", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> => {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });

      // Otherwise, return success response
      return ServiceResponse.success("Login successful", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },
};

export default authController;
