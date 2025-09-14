import error from "@src/utils/error";
import userService from "../user";
import { generateHash } from "@src/utils/hashing";
import { RegisterInput } from "@src/api/v1/auth/types";
import { IUser } from "@src/types/user";
import generateOtp from "@src/utils/generateOtp";

type RegisterResult = {
  user: IUser;
  plainOtp: string;
};

const register = async ({
  username,
  credential,
  password,
}: RegisterInput): Promise<RegisterResult> => {
  const isUserExist = await userService.userExist(credential);

  if (isUserExist) {
    throw error("user already exist", 400);
  }

  const countUnverifiedAttempts = await userService.unverifiedAttempts(
    credential
  );

  if (countUnverifiedAttempts.length >= 3) {
    throw error("Too many attempt. Please wait at least ten minuite!");
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

const authService = { register };

export default authService;
