import { Document, Types } from "mongoose";

export interface IProfile extends Document {
  user_id: Types.ObjectId; // <-- must match Schema.Types.ObjectId
  fullName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
