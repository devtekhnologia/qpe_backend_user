import { Request, Response, NextFunction } from "express";
import UserService from "../Services/userService";
import { ApiResponse } from "../Utils/response";
import mongoose from "mongoose";

export const UserController = {
  registerAdmin: async (req: Request, res: Response, next: NextFunction): Promise<any |void> => {
    try {
      const { name, email, password,school_name,role_id } = req.body;
      const user_id = new mongoose.Types.ObjectId("5f92cbf10cf217478ba93561");
      const result = await UserService.registerAdmin({ name,email,password,school_name,role_id,user_id  });

      // If `result` is an instance of `ApiResponse`, return it directly
      if (result instanceof ApiResponse) {
        return res.status(result.statusCode).json(result);
      }

      // Otherwise, return success response
      res.status(201).json(ApiResponse.created("Admin registered successfully", result));
    } catch (error: any) {
      res.status(400).json(ApiResponse.badRequest(error.message));
    }
  },


  registerUser: async (req: Request, res: Response, next: NextFunction): Promise<any |void> => {
    try {
      const { name, email, password,school_id,role_id,user_id } = req.body;
     
      const result = await UserService.registerUser({ name,email,password,school_id,role_id,user_id  });

      // If `result` is an instance of `ApiResponse`, return it directly
      if (result instanceof ApiResponse) {
        return res.status(result.statusCode).json(result);
      }

      // Otherwise, return success response
      res.status(201).json(ApiResponse.created("User registered successfully", result));
    } catch (error: any) {
      res.status(400).json(ApiResponse.badRequest(error.message));
    }
  },


  login: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
    try {
      const { email, password } = req.body;
      const result = await UserService.loginUser({ email, password });

      // If `result` is an instance of `ApiResponse`, return it directly
      if (result instanceof ApiResponse) {
        return res.status(result.statusCode).json(result);
      }
      // Otherwise, return success response
      res.status(200).json(ApiResponse.success("Login successful", result));
    } catch (error: any) {
      res.status(400).json(ApiResponse.badRequest(error.message));
    }
  }

};























export default UserController;



  