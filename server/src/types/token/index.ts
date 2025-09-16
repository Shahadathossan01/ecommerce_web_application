import jwt, { Algorithm, SignOptions, Secret } from "jsonwebtoken";

import { Types } from "mongoose";

export type AuthPayload = {
  _id: Types.ObjectId;
  username: string;
  credential: string;
  role: "user" | "admin";
};

export interface GenerateTokenOptions<T extends object> {
  payload: T;
  algorithm?: Algorithm;
  secret?: Secret;
  expiresIn?: SignOptions["expiresIn"];
}
