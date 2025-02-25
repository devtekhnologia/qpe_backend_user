import { IUser,ILoginUser,token } from "../Interfaces/userInterface";
import bcrypt from "bcrypt";
import { ApiResponse } from "../Utils/response";
import UserModel from "../Models/userModel";
import schoolModel from "../Models/schoolModel"
import jwt from "jsonwebtoken"
import { getEpochTime } from "../Utils/epochTime";

const UserService = {
  registerUser: async ({
    name,
    email,
    password,
    schoolName,
    roleId,
    userId
  }: IUser ): Promise<IUser | ApiResponse> => {

  
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return ApiResponse.success("User already exists");
    }
  
    // Check if school exists
    // Check if school exists
let school = await schoolModel.findOne({ name: schoolName.trim() }).lean();

if (!school) {
  school = await new schoolModel({
    name: schoolName.trim(),
    created_at: getEpochTime(), 
    created_by:userId
  }).save();
}

  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Generate timestamp
    const createdAt = getEpochTime();
  
    // Create the user with additional fields
    const newUser = new UserModel({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      schoolId: school._id,
      roleId:roleId,
      userId:userId,
      created_at: createdAt,
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    });
  
    // Save user
    const userSave = await newUser.save();
    console.log(userSave);
  
    return ApiResponse.created("User registered successfully", userSave);
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

    return { token };
  }

}

export default UserService

