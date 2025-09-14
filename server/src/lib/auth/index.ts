import error from "@src/utils/error";
import userService from "../user";
import { generateHash } from "@src/utils/hashing";
import generateOtp from "@src/utils/generateOtp";
import { IUser, RegisterInput } from "@src/types/auth";

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

const authService = { register };

export default authService;
