import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
    role_name: string;
    created_by: mongoose.Types.ObjectId;
    created_at: number;
}

const RoleSchema = new Schema<IRole>({
    role_name: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Number, required: true }
});

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
