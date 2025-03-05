import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import UserService from "./userService";
import { ServiceResponse } from "../../utils/response";

export const UserController = {
  registerAdmin: async (req: Request, res: Response, next: NextFunction): Promise<any |void> => {
    try {
      const { name, email, password,school_name,role_id } = req.body;
      const user_id = new mongoose.Types.ObjectId("5f92cbf10cf217478ba93561");
      const result = await UserService.registerAdmin({ name,email,password,school_name,role_id,user_id  });

      // If `result` is an instance of `ServiceResponse`, return it directly
      if (result instanceof ServiceResponse) {
        return res.status(result.statusCode).json(result);
      }

      // Otherwise, return success response
      return ServiceResponse.created("Admin registered successfully", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },


  registerUser: async (req: Request, res: Response, next: NextFunction): Promise<any |void> => {
    try {
      const { name, email, password,school_id,role_id,user_id } = req.body;
     
      const result = await UserService.registerUser({ name,email,password,school_id,role_id,user_id  });

      // If `result` is an instance of `ServiceResponse`, return it directly
      if (result instanceof ServiceResponse) {
        return res.status(result.statusCode).json(result);
      }

      // Otherwise, return success response
      return ServiceResponse.created("User registered successfully", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  },


  login: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
    try {
      const { email, password } = req.body;
      const result = await UserService.loginUser({ email, password });

      // If `result` is an instance of `ServiceResponse`, return it directly
      if (result instanceof ServiceResponse) {
        return res.status(result.statusCode).json(result);
      }
      // Otherwise, return success response
      return ServiceResponse.success("Login successful", result);
    } catch (error: any) {
      return ServiceResponse.badRequest(error.message);
    }
  }

};























export default UserController;



  