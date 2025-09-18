// src/types/user.ts
import authValidations from "@src/validations/auth";
import { Document, Types } from "mongoose";
import { z } from "zod";
import { Request } from "express";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  credential: string;
  password: string;
  otp: string;
  isVerified: boolean;
  expiryOtp: Date;
  resetPasswordRequested: boolean;
  role: "user" | "admin";
  profile?: IProfile;
  createdAt: Date;
  updatedAt: Date;
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

export type VerifyRegisterOtpInput = z.infer<
  typeof authValidations.verifyRegisterOtpSchema
>;
export type loginInput = z.infer<typeof authValidations.loginSchema>;

export type ResendOtpInput = z.infer<typeof authValidations.resendOtpSchema>;

export type ForgotPasswordInput = z.infer<
  typeof authValidations.forgotPasswordSchema
>;

export type VerifyResetOtpInput = z.infer<
  typeof authValidations.verifyResetOtpSchema
>;
export type resetPasswordInput = z.infer<
  typeof authValidations.resetPasswordSchema
>;

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
