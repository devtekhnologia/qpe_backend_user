
import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../Interfaces/userInterface"; 

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// export const UserModel = model<IUser>("qpeUser", userSchema)

const connection = mongoose.connection.useDb("qpeUsers");
const UserModel = connection.model("user", userSchema);
export default UserModel;