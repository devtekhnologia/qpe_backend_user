import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Define Zod Schema for validation
export const userSchemaValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    school_name: z.string().min(2, "School name is required"),
    role_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format") // MongoDB ObjectId validation
});

// Define TypeScript interface for User Document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    school_name: string;
    role_id: mongoose.Types.ObjectId;
}

// Define Mongoose Schema
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, minlength: 2 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6 },
        school_name: { type: String, required: true, minlength: 2 },
        role_id: { type: Schema.Types.ObjectId, required: true, ref: "Role" } // Reference to Role collection
    }
);

// Create Mongoose Model
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
