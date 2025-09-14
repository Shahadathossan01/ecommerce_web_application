import { generateHash } from "./hashing";

const generateOtp = async (): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = await generateHash(otp);
  return hashedOtp;
};

export default generateOtp;
