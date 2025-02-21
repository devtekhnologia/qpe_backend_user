import { UserModel } from "../Models/userModel";
import { IUser } from "../Interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";

export const UserService = {
  registerUser: async ({ name, email, password }: IUser): Promise<ApiResponse> => {
    try {
      // Check if all fields are provided
      if (!name || !email || !password) {
        return ApiResponse.badRequest("All fields are required: name, email, password");
      }

      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return ApiResponse.success("User already exists");
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new UserModel({ name, email, password: hashedPassword });
      await newUser.save();

      return ApiResponse.created("User registered successfully", newUser);
    } catch (error: any) {
      return ApiResponse.internalServerError(error.message);
    }
  }
};
