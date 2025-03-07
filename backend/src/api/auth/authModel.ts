import mongoose, { Schema, Document } from "mongoose";
import { commonValidations } from "../../utils/commonValidations";
import { z } from "zod";
import { getEpochTime } from "../../utils/epochTime";

// ==================== TypeScript Interface ====================

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role_id: mongoose.Types.ObjectId;
  school_name: string;
  school_registration_id?: mongoose.Types.ObjectId; // Null for Admin, required for others
  status: number; // 1: active, 0: inactive
  created_by?: mongoose.Types.ObjectId; // Null for first Admin
  updated_by?: mongoose.Types.ObjectId;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

// ==================== Zod Validation Schemas ====================

// Admin registration validation schema
const adminBodySchema = z.object({
  name: commonValidations.name,
  email: commonValidations.email,
  password: commonValidations.password,
  school_name: commonValidations.name, // Admin registers with school name
  school_registration_id: commonValidations.string
});

// Wrap it in an object to match validation middleware structure
export const adminRequestSchema = {
  body: adminBodySchema,
};

// User registration validation schema (Created by Admin)
const userBodySchema = z.object({
  name: commonValidations.name,
  email: commonValidations.email,
  password: commonValidations.password,
  created_by: commonValidations.id.optional(), // Admin has `null`
  updated_by: commonValidations.id.optional(),
});

// Wrap it in an object to match validation middleware structure
export const userRequestSchema = {
  body: userBodySchema,
};

// ==================== Mongoose Schema (DB) ====================

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "role", required: true },
    school_registration_id: { type: String, required: true, trim: true },
    status: { type: Number, default: 1, enum: [0, 1] },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    refresh_token: { type: String, default: null },
    created_at: { type: String, default: getEpochTime() },
    updated_at: { type: String },
  }
);


// Indexes for faster queries
userSchema.index({ role_id: 1 });

// Use a specific database connection (uncomment if needed)
// const connection = mongoose.connection.useDb("qpeUsers");

const UserModel = mongoose.model<User>("user", userSchema);

export default UserModel;
