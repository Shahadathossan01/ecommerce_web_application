import { IUser } from "@src/types/auth";
import { Schema, model } from "mongoose";
import "./Profile";
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    credential: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    }, // matches Zod
    password: { type: String, required: true },
    otp: { type: String, length: 6 },
    isVerified: { type: Boolean, default: false },
    expiryOtp: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 60 * 1000),
    },
    resetPasswordRequested: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual for profile
userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

const User = model<IUser>("User", userSchema);

export default User;
