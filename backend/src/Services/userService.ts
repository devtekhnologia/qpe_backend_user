import { IRegisterAdmin, IRegisterUser,ILoginUser,tokenInterface } from "../Interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";
import UserModel from "../Models/userModel";
import schoolModel from "../Models/schoolModel";
import { getEpochTime } from "../Utils/epochTime";
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";

const UserService = {
  // Register Admin (Creates a School if it doesn't exist)
  registerAdmin: async ({
    name,
    email,
    password,
    schoolName,
    roleId,
    userId , // Default to null if not provided
  }: IRegisterAdmin): Promise<ApiResponse> => {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email }).lean();
      if (existingUser) {
        return ApiResponse.success("User already exists");
      }

      // Check if school exists
      let school = await schoolModel.findOne({ name: schoolName.trim() }).lean();

      if (!school) {
        school = await new schoolModel({
          name: schoolName.trim(),
          created_at: getEpochTime(),
          created_by: userId || null, // Handle null case properly
        }).save();
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate timestamp
      const createdAt = getEpochTime();

      // Create the Admin user
      const newUser = new UserModel({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        schoolId: school._id, // Assign schoolId from created/found school
        roleId,
        userId, // Can be null
        created_at: createdAt,
        updated_by: null,
        updated_at: null,
        deleted_by: null,
        deleted_at: null,
      });

      // Save user
      const userSave = await newUser.save();

      return ApiResponse.created("Admin registered successfully", userSave);
    } catch (error) {
      console.error("Error in registerAdmin:", error);
      return ApiResponse.internalServerError("Failed to register admin");
    }
  },

  // Register User (Uses an existing School ID)
  registerUser: async ({
    name,
    email,
    password,
    schoolId,
    roleId,
    userId  // Default to null if not provided
  }: IRegisterUser): Promise<ApiResponse> => {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email }).lean();
      if (existingUser) {
        return ApiResponse.success("User already exists");
      }

      // Ensure `schoolId` is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return ApiResponse.badRequest("Invalid schoolId format");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate timestamp
      const createdAt = getEpochTime();

      // Create the user
      const newUser = new UserModel({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        schoolId: new mongoose.Types.ObjectId(schoolId),
        roleId,
        userId, // Can be null
        created_at: createdAt,
        updated_by: null,
        updated_at: null,
        deleted_by: null,
        deleted_at: null,
      });

      // Save user
      const userSave = await newUser.save();

      return ApiResponse.created("User registered successfully", userSave);
    } catch (error) {
      console.error("Error in registerUser:", error);
      return ApiResponse.internalServerError("Failed to register user");
    }
  },

  loginUser: async ({ email, password }: ILoginUser): Promise< tokenInterface | ApiResponse> => {
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
    const token = Jwt.sign({ userId: user._id,roleId:user.roleId }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return { token };
  }

}

export default UserService

