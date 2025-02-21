import { ApiResponse } from "../Utils/response";

import { Request, Response,NextFunction } from "express";
import User from "../Models/userModel";

import { userService } from "../Services/userService";

import jwt from "jsonwebtoken";

// Secret Key for JWT (Store in ENV file)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User

export const userController = {
   registerUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const result = await userService.registerUser(name, email, password, role);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  
    loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}