import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
    roleName: string;
    created_by: mongoose.Types.ObjectId;
    created_at: number;
}

const RoleSchema = new Schema<IRole>({
    roleName: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Number, required: true }
});

export const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
