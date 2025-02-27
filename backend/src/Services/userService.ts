import { IRegisterAdmin, IRegisterUser,ILoginUser,tokenInterface } from "../Interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";
import UserModel from "../Models/userModel";
import schoolModel from "../Models/schoolModel";
import { getEpochTime } from "../Utils/epochTime";
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";

const UserService = {
  
  registerAdmin: async ({
    name,
    email,
    password,
    schoolName,
    roleId,
    userId , 
  }: IRegisterAdmin): Promise<ApiResponse | any> => {
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
   
      return {
        email: newUser.email,
        password: newUser.password,
        userId: newUser.userId,
        roleId: newUser.roleId,
        schoolId: newUser.schoolId,
      };

    } catch (error) {
      console.error("Error in registerAdmin:", error);
      return ApiResponse.internalServerError('Error in registerAdmin');
    }
  },

  registerUser: async ({
    name,
    email,
    password,
    schoolId,
    roleId,
    userId  // Default to null if not provided
  }: IRegisterUser): Promise<ApiResponse | any > => {
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

      return {
        email: newUser.email,
        password: newUser.password,
        userId: newUser.userId,
        roleId: newUser.roleId,
        schoolId: newUser.schoolId,
      };

    } catch (error) {
      console.error("Error in registerUser:", error);
      return ApiResponse.internalServerError("Failed to register user");
    }
  },

  loginUser: async ({ email, password }: ILoginUser): Promise<tokenInterface | ApiResponse> => {
    if (!email || !password) {
        return ApiResponse.badRequest("Email and password are required");
    }
  
    // Fetch user along with role details using aggregation
    const user = await UserModel.aggregate([
        { $match: { email } },
        { 
            $lookup: { 
                from: "roles",  
                localField: "roleId", 
                foreignField: "_id", 
                as: "roleInfo"
            }
        },
        { $unwind: "$roleInfo" }, 
        { 
            $project: { 
                email: 1, 
                password: 1, 
                roleId: 1, 
                roleName: "$roleInfo.roleName" 
            } 
        }
    ]).exec();
  
    if (!user.length) {
        return ApiResponse.unauthorized("Invalid credentials");
    }
  
    const foundUser = user[0];
  
    // Validate password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        return ApiResponse.unauthorized("Invalid credentials");
    }
  
    // Generate JWT token with role name
    const token = Jwt.sign(
        { userId: foundUser._id, roleId: foundUser.roleId, roleName: foundUser.roleName }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: "1d" }
    );
  
    return { token };
  }

}

export default UserService

