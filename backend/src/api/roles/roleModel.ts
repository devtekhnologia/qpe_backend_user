import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Define Zod Schema for role validation
export const roleSchemaValidation = z.object({
    name: z.string().min(2, "Role name must be at least 2 characters long")
});

// Define TypeScript interface for Role Document
export interface IRole extends Document {
    name: string;
}

// Define Mongoose Schema
const roleSchema = new Schema<IRole>(
    {
        name: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

// Create Mongoose Model
const RoleModel = mongoose.model<IRole>("Role", roleSchema);

export default RoleModel;
