import { GenerateTokenOptions } from "@src/types/token";
import jwt, { Secret } from "jsonwebtoken";

const generateToken = <T extends object>({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET as Secret,
  expiresIn = "1h",
}: GenerateTokenOptions<T>): string => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    console.log("[JWT]", e);
    throw new Error("Server Error");
  }
};

const tokenService = {
  generateToken,
};

export default tokenService;
