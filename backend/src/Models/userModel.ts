import mongoose, { Schema, model, Document } from "mongoose";
import { IUserModel } from "../Interfaces/userInterface";

// Define the user schema with additional fields
const userSchema = new Schema<IUserModel & Document>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null }, // Optional
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "role", required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "school", default: null }, // Default null for admin
    status: { type: Number, default: 1 },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    created_at: { type: Number, required: true },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    updated_at: { type: Number, default: null },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    deleted_at: { type: Number, default: null },
  },
  {
    timestamps: false, // Since timestamps are handled manually
    versionKey: false,
  }
);

// Use a specific database connection
const connection = mongoose.connection.useDb("qpeUsers");
const UserModel = connection.model<IUserModel & Document>("user", userSchema);

export default UserModel;

