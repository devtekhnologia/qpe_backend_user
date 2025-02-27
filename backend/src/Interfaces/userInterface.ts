import mongoose from "mongoose";



export interface IRegisterBase {
  name: string;
  email: string;
  password: string;
  role_id: mongoose.Types.ObjectId; // Common for both
  user_id?: mongoose.Types.ObjectId; // Optional because admin might not have user_id
}

export interface IRegisterAdmin extends IRegisterBase {
  school_name: string; // Admin provides a schoolName instead of schoolId
}

export interface IRegisterUser extends IRegisterBase {
  school_id: mongoose.Types.ObjectId; // Normal users have schoolId
}

export interface IUserModel extends IRegisterBase {
  school_id?: mongoose.Types.ObjectId; // Admin may not have schoolId at creation
  status?: number;
  created_by?: mongoose.Types.ObjectId;
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

  export interface tokenInterface{
    token: string;
  }


