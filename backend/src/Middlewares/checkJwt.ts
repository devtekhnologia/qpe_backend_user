import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtUtils";

declare module 'express-serve-static-core' {
  interface Request {
    client?: any;
  }
}
export const checkJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const urlsWithoutToken = ["/role", "/auth/login"];
    const skipVerify = urlsWithoutToken.includes(req.url.split("?")[0]);
    const authHeader = req.header("Authorization");
    if (skipVerify && !authHeader) {
      return next();
    } else if (!authHeader) {
      return res.status(401).send({ message: "Authorization header missing" });
    }
    const token = authHeader.replace("Bearer ", "");
    const payload: any = await verifyToken(token);
    if (!payload) {
      throw new Error("Invalid token")
    }
    req.client = payload;

    next();
  } catch (err) {
    return res.status(401).send({message: "Invalid Token"});
  }
};
