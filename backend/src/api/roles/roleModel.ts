import mongoose, { Schema, Document } from "mongoose";
import { getEpochTime } from "../../utils/epochTime";
import { z } from "zod";

// Define TypeScript interface for Role Document
export interface IRole extends Document {
    name: string;
    createdAt: string;
    updatedAt: string;
}

//Define Zod schema for Role validation
const bodySchema = z.object({
    name: z.string().min(2, "Role name must be at least 2 characters long"),
});

//Wrap it in an object to match `ValidationSchema` structure
export const roleRequestSchema = {
    body: bodySchema, // Ensuring it fits the expected structure
};

// Define Mongoose Schema
const roleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    createdAt: { type: String, default: getEpochTime() },
    updatedAt: { type: String, default: getEpochTime() }
});

// Create Mongoose Model
const RoleModel = mongoose.model<IRole>("Role", roleSchema);

export default RoleModel;
