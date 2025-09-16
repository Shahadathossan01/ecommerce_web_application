import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username too short")
    .max(30, "Username too long")
    .trim() // removes leading/trailing spaces
    .transform((val) => val.replace(/\s+/g, " ")), // collapse multiple spaces

  credential: z
    .email("Invalid email format")
    .trim() // remove spaces
    .transform((val) => val.toLowerCase()), // lowercase email

  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

const verifyRegisterOtpSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLocaleLowerCase()),

  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const loginSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim() // remove spaces
    .transform((val) => val.toLowerCase()), // lowercase email

  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

const authValidations = {
  registerSchema,
  verifyRegisterOtpSchema,
  loginSchema,
};

export default authValidations;
