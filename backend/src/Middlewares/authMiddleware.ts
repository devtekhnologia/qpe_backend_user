import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { ServiceResponse } from "../utils/response";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return ServiceResponse.unauthorized("Access token required");

  Jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, user: any) => {
    if (err) return ServiceResponse.unauthorized("Invalid access token");
    (req as any).user = user;
    next();
  });
};

