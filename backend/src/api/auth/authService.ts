import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import { getEpochTime } from "../../utils/epochTime";
import { ServiceResponse } from "../../utils/response";
import UserModel, { User } from "./authModel";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils";

// JWT Secret Keys (Should be stored in environment variables)
const ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_refresh_token_secret";

const authService = {
  // =================== Register Admin ===================
  createAdmin: async ({
    name,
    email,
    password,
    role_id,
    role_name,
    school_name,
    school_registration_id,
  }: any): Promise<ServiceResponse | any> => {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email }).lean<User>();
      if (existingUser)
        return ServiceResponse.badRequest("User already exists");

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the Admin User
      const newUser = new UserModel({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        role_id,
        role_name,
        school_name,
        school_registration_id,
        created_by: null,
        updated_by: null,
        created_at: getEpochTime(),
        updated_at: null,
        refresh_token: null, // Initially null
      });

      const savedUser: any = await newUser.save();

      // Generate Access & Refresh Tokens
      const accessToken = generateAccessToken({
        user_id: savedUser._id.toString(),
        role_id: savedUser.role_id.toString(),
        role_name: savedUser.role_name.toString(),
        school_registration_id: savedUser.school_registration_id
      });

      const refreshToken = generateRefreshToken({
        user_id: savedUser._id.toString(),
        role_id: savedUser.role_id.toString(),
        role_name: savedUser.role_name.toString(),
        school_registration_id: savedUser.school_registration_id
      });

      // Store Refresh Token in DB
      await UserModel.updateOne(
        { _id: savedUser._id },
        { refresh_token: refreshToken }
      );

      return ServiceResponse.created("Admin registered successfully", {
        user_id: savedUser._id.toString(),
        email: savedUser.email,
        role_id: savedUser.role_id.toString(),
        role_name: savedUser.role_name,
        school_registration_id: savedUser.school_registration_id,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return ServiceResponse.internalServerError("Error in registerAdmin");
    }
  },

  // =================== Login User ===================
  loginUser: async ({
    email,
    password,
  }: any): Promise<ServiceResponse | any> => {
    try {
      const user: any = await UserModel.findOne({ email }).lean<User>();
      if (!user) return ServiceResponse.unauthorized("Invalid credentials");

      // Validate password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return ServiceResponse.unauthorized("Invalid credentials");

      // Generate Tokens
      const accessToken = generateAccessToken({
        user_id: user._id.toString(),
        role_id: user.role_id.toString(),
        role_name: user.role_name,
        school_registration_id: user.school_registration_id
      });

      const refreshToken = generateRefreshToken({
        user_id: user._id.toString(),
        role_id: user.role_id.toString(),
        role_name: user.role_name,
        school_registration_id: user.school_registration_id
      });

      // Update Refresh Token in DB
      await UserModel.updateOne(
        { _id: user._id },
        { refresh_token: refreshToken }
      );

      return ServiceResponse.success("Login successful", {
        user_id: user._id.toString(),
        role_id: user.role_id.toString(),
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return ServiceResponse.internalServerError("Login failed");
    }
  },

  // =================== Refresh Access Token ===================
  refreshAccessToken: async (
    refreshToken: string
  ): Promise<ServiceResponse | any> => {
    try {
      if (!refreshToken)
        return ServiceResponse.badRequest("Refresh token required");

      // Find user with the provided refresh token
      const user: any = await UserModel.findOne({
        refresh_token: refreshToken,
      }).lean<User>();
      if (!user) return ServiceResponse.unauthorized("Invalid refresh token");

      // Verify Refresh Token
      try {
        const decoded: any = Jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        if (!decoded)
          return ServiceResponse.unauthorized("Invalid refresh token");
      } catch (err) {
        return ServiceResponse.unauthorized("Invalid refresh token");
      }

      // Generate new Access Token
      const newAccessToken = generateAccessToken({
        user_id: user._id.toString(),
        role_id: user.role_id.toString(),
        role_name: user.role_name,
        school_registration_id: user.school_registration_id
      });

      return ServiceResponse.success("Access token refreshed", {
        access_token: newAccessToken,
      });
    } catch (error) {
      return ServiceResponse.internalServerError("Could not refresh token");
    }
  },
};


export default authService;