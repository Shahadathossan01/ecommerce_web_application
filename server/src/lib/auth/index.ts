import error from "@src/utils/error";
import { differenceInMinutes } from "date-fns";
import userService from "../user";
import { generateHash, hashMatched } from "@src/utils/hashing";
import generateOtp from "@src/utils/generateOtp";
import {
  IUser,
  loginInput,
  RegisterInput,
  VerifyRegisterOtpInput,
} from "@src/types/auth";
import User from "@src/model/User";
import { MutateResponse } from "@src/types/common";
import { AuthPayload } from "@src/types/token";
import tokenService from "../token";

type RegisterServiceResponse = {
  user: IUser;
  plainOtp: string;
};

const register = async ({
  username,
  credential,
  password,
}: RegisterInput): Promise<RegisterServiceResponse> => {
  const isUserExist = await userService.userExist(credential);

  if (isUserExist) {
    throw error(404, "Used another credential", "User already exist");
  }

  const countUnverifiedAttempts = await userService.unverifiedAttempts(
    credential
  );

  if (countUnverifiedAttempts.length >= 3) {
    throw error(
      400,
      "Wrong attempt",
      "Too many attempt. Please wait at least two minuite!"
    );
  }

  const hashedPassword = await generateHash(password);
  const { plainOtp, hashedOtp } = await generateOtp();
  const user = await userService.createUser({
    username,
    credential,
    password: hashedPassword,
    hashedOtp,
  });

  return { user, plainOtp };
};

const verifyRegisterOtp = async ({
  credential,
  otp,
}: VerifyRegisterOtpInput): Promise<MutateResponse> => {
  if (!credential || !otp) {
    throw error(400, "Invalid parameters", "Must be provide valid parameters");
  }
  const isUserExist = await userService.userExist(credential);

  if (isUserExist) {
    throw error(404, "Not Found", "Please provide valid credential");
  }

  const existingAllUser: IUser[] = await userService.findAllUser({
    credential,
    isVerified: false,
    sortValue: -1,
  });

  if (existingAllUser.length === 0) {
    throw error(404, "Not Found", "User not found");
  }

  let user: IUser | null = null;

  if (existingAllUser.length > 1) {
    user = existingAllUser[0];
    await User.deleteMany({
      credential,
      isVerified: false,
      _id: { $ne: user._id },
    });
  } else {
    user = existingAllUser[0];
  }

  const isOtpValid = await hashMatched(otp, user.otp);

  if (!isOtpValid) {
    throw error(400, "Invalid OTP", "The OTP you entered is incorrect");
  }

  if (!user.expiryOtp) {
    throw error(400, "Invalid Data", "OTP expiry timestamp missing");
  }

  const minutesPassed = differenceInMinutes(new Date(), user.expiryOtp);

  if (minutesPassed >= 2) {
    throw error(400, "OTP Expired", "The OTP has expired");
  }

  user.isVerified = true;
  user.otp = "";
  user.expiryOtp = undefined;
  await user.save({ validateModifiedOnly: true });

  const res = {
    code: 200,
    message: "Email verified successfull. Please log in!",
    links: {
      self: "/api/v1/auth/verifyRegisterOtp",
      login: "/api/v1/auth/login",
    },
  };

  return res;
};

const login = async ({ credential, password }: loginInput): Promise<string> => {
  const user = await userService.findUserByEmail(credential);
  if (!user) {
    throw error(401, "Unauthorized", "Invalid credentials");
  }

  const isMatchPassword = await hashMatched(password, user.password);

  if (!isMatchPassword) {
    throw error(400, "Not Found", "Invalid credentials");
  }

  const payload: AuthPayload = {
    _id: user._id,
    username: user.username,
    credential: user.credential,
    role: user.role,
  };

  const access_token: string = tokenService.generateToken({ payload });

  return access_token;
};

const authService = { register, verifyRegisterOtp, login };

export default authService;
