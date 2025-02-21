
const bcrypt = require('bcryptjs');
import { query } from '../Utils/database';
import jwt from "jsonwebtoken";
//import { sendGmailEmail } from '../../../Utils/sendEmail';
import { ApiResponse } from "../Utils/response";

// import {RegisterRequest, } from "../Interfaces/userInterface";
import User from "../Models/userModel";

import dotenv from 'dotenv';
dotenv.config();


export const userService = {


    const JWT_SECRET = process.env.JWT_SECRET

    registerUser = async (name: string, email: string, password: string, role: string) => {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create new user
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    
    const JWT_SECRET = process.env.JWT_SECRET
  
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    return { message: "User registered successfully", token };
  },
  
  // Login User
  loginUser = async (email: string, password: string) => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
  
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
  
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  
    return { message: "Login successful", token };
  }
  

}