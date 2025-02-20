
const bcrypt = require('bcryptjs');
import { query } from '../Utils/database';
//import { sendGmailEmail } from '../../../Utils/sendEmail';
import { ApiResponse } from "../Utils/response";
//import { storeOtpInMemory, sendOtpToEmail, checkOtpInMemory, otpCache } from "../../../Utils/sendEmail";
// import { generatePassword, validatePassword } from '../../../Utils/generatePassword';
// import {RegisterRequest, } from "../Interfaces/userInterface";


export const userService = {


// Register User
export const registerUserService = async (name: string, email: string, password: string, role: string) => {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create new user
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();
  
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    return { message: "User registered successfully", token };
  };
  
  // Login User
  export const loginUserService = async (email: string, password: string) => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
  
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
  
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    return { message: "Login successful", token };
  };
  2️⃣ Controller Layer (userController.ts)
  Handles request & response, calls the service functions.
  
  ts
  Copy
  Edit
  import { Request, Response } from "express";
  import { registerUserService, loginUserService } from "../services/userService";
  
  // Wrapper function to handle async errors
  const asyncHandler = (fn: Function) => (req: Request, res: Response) => {
    fn(req, res).catch((error: any) => {
      res.status(500).json({ message: error.message || "Server error" });
    });
  };
  
  // Register User
  export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const result = await registerUserService(name, email, password, role);
    res.status(201).json(result);
  });
  
  // Login User
  export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    res.status(200).json(result);





}