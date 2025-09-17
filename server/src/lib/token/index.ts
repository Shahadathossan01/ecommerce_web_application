import { GenerateTokenOptions, VerifyTokenOptions } from "@src/types/token";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

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

const verifyToken = <T = JwtPayload>({
  token,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET as Secret,
}: VerifyTokenOptions): T => {
  try {
    const decoded = jwt.verify(token, secret, { algorithms: [algorithm] });
    return decoded as T;
  } catch (e) {
    console.log("[JWT]", e);
    throw "ops";
  }
};

const tokenService = {
  generateToken,
  verifyToken,
};

export default tokenService;
