import User from "../Models/userModel";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export class UserService {
  // Register User
  static async registerUser(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<{ message: string; token?: string }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { message: "User registered successfully", token };
  }

  // Login User
  static async loginUser(
    email: string,
    password: string
  ): Promise<{ message: string; token?: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { message: "Login successful", token };
  }
}