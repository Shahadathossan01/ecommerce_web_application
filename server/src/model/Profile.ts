import { IProfile } from "@src/types/profile";
import { Schema, model } from "mongoose";

const profileSchema = new Schema<IProfile>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true }
);

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
