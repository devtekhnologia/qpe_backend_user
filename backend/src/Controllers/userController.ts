import { Request, Response,NextFunction } from "express";
import { UserService } from "../Services/userService";

export const UserController = {
    register: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
        try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser({ name, email, password });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};
