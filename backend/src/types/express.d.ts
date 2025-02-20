// src/types/express.d.ts
import { User } from "../Models/userModel";  // Update this path based on your project structure

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Adding `user` to Request type
    }
  }
}
