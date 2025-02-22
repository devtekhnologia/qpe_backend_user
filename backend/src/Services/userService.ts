import { IUser,ILoginUser,token } from "../Interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";
import UserModel from "../Models/userModel";
import jwt from "jsonwebtoken"

const UserService = {
  registerUser: async ({ name, email, password }: IUser): Promise< IUser |ApiResponse> => {
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

    console.log(newUser);

    await newUser.save();
    return newUser;
  },

  loginUser: async ({ email, password }: ILoginUser): Promise< token | ApiResponse> => {
    // Check if all fields are provided
    if (!email || !password) {
      return ApiResponse.badRequest("Email and password are required");
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return ApiResponse.unauthorized("Invalid credentials");
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.unauthorized("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return { ...user.toObject(), token };
  }


};

export default UserService;



