import { IRegisterAdmin, IRegisterUser,ILoginUser,tokenInterface } from "../interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";
import UserModel from "../models/userModel";
import schoolModel from "../models/schoolModel";
import { getEpochTime } from "../Utils/epochTime";
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";

const UserService = {
  
  registerAdmin: async ({
    name,
    email,
    password,
    school_name,
    role_id,
    user_id , 
  }: IRegisterAdmin): Promise<ApiResponse | any> => {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email }).lean();
console.log(existingUser)

      if (existingUser) {
        return ApiResponse.success("User already exists");
      }

      // Check if school exists
      let school = await schoolModel.findOne({ name: school_name.trim() }).lean();


      if (!school) {
        school = await new schoolModel({
          name: school_name.trim(),
          created_at: getEpochTime(),
          created_by: user_id || null, // Handle null case properly
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
        school_id: school._id, // Assign schoolId from created/found school
        role_id,
        created_by:user_id,
        created_at: createdAt,
        updated_by: null,
        updated_at: null,
        deleted_by: null,
        deleted_at: null,
      });

      const savedUser = await newUser.save();


      return {
        email: savedUser.email,
        password: savedUser.password,
        user_id: savedUser._id,
        role_id: savedUser.role_id,
        school_id: savedUser.school_id,
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
    school_id,
    role_id,
    user_id  // Default to null if not provided
  }: IRegisterUser): Promise<ApiResponse | any > => {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email }).lean();
      if (existingUser) {
        return ApiResponse.success("User already exists");
      }

      // Ensure `schoolId` is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(school_id)) {
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
        school_id: new mongoose.Types.ObjectId(school_id),
        role_id,
        created_by:user_id,
        created_at: createdAt,
        updated_by: null,
        updated_at: null,
        deleted_by: null,
        deleted_at: null,
      });

      const savedUser = await newUser.save();


      return {
        email: savedUser.email,
        password: savedUser.password,
        user_id: savedUser._id,
        role_id: savedUser.role_id,
        school_id: savedUser.school_id,
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
  console.log(email)
    // Fetch user along with role details using aggregation
    const user = await UserModel.aggregate([
        { $match: { email } },
        { 
            $lookup: { 
                from: "roles",  
                localField: "role_id", 
                foreignField: "_id", 
                as: "roleInfo"
            }
        },
        { $unwind: "$roleInfo" }, 
        { 
            $project: { 
                email: 1, 
                password: 1, 
                schoolId:1,
                role_id: 1, 
                roleName: "$roleInfo.roleName" 
            } 
        }
    ]).exec();

    console.log(user)
  
    if (!user.length) {
        return ApiResponse.unauthorized("Invalid credentials");
    }
  console.log(user)
    const foundUser = user[0];

    console.log(foundUser)
  
    // Validate password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        return ApiResponse.unauthorized("Invalid credentials");
    }
  
    // Generate JWT token with role name
    const token = Jwt.sign(
        { user_id: foundUser._id, role_id: foundUser.role_id, role_name: foundUser.role_name }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: "1d" }
    );
  
    return { token };
  }

}

export default UserService

