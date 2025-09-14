// src/types/user.ts
import { IProfile } from "./profile";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  credential: string;
  password: string;
  otp: string;
  isVerified: boolean;
  expiryOtp?: Date;
  resetPasswordOTPVerified: boolean;
  role: "user" | "admin";

  // Virtual for profile
  profile?: IProfile; // properly typed instead of any
}
