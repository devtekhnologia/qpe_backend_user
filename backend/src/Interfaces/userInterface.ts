import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  schoolName: string;
  roleId: mongoose.Types.ObjectId;// This is used in the service
  userId:mongoose.Types.ObjectId
}





export interface IUserModel extends IUser {
  schoolId: mongoose.Types.ObjectId;
  status?: number;
  created_by: mongoose.Types.ObjectId;
  created_at: number;
  updated_by?: mongoose.Types.ObjectId;
  updated_at?: number;
  deleted_by?: mongoose.Types.ObjectId;
  deleted_at?: number;
}

  
  export interface ILoginUser {
    email: string;
    password: string;
  }

  export interface token{
    token: string;
  }


