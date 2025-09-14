// src/types/user.ts
import authValidations from "@src/validations/auth";
import { Document, Types } from "mongoose";
import { z } from "zod";

export interface IUser extends Document {
  username: string;
  credential: string;
  password: string;
  otp: string;
  isVerified: boolean;
  expiryOtp?: Date;
  resetPasswordOTPVerified: boolean;
  role: "user" | "admin";
  profile?: IProfile;
}

export interface IProfile extends Document {
  user_id: Types.ObjectId;
  fullName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RegisterInput = z.infer<typeof authValidations.registerSchema>;
