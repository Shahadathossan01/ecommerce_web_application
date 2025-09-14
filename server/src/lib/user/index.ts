import { RegisterInput } from "@src/api/v1/auth/types";
import User from "@src/model/User";
import { IUser } from "@src/types/user";
import error from "@src/utils/error";

const findUserByEmail = async (
  credential: string
): Promise<IUser | boolean> => {
  const user = await User.findOne({ credential, isVerified: true });
  return user ? user : false;
};

const userExist = async (credential: string): Promise<boolean> => {
  const user = await findUserByEmail(credential);
  return user ? true : false;
};

const unverifiedAttempts = async (credential: string): Promise<IUser[]> => {
  const unverifiedAttempts = await User.find({ credential, isVerified: false });
  return unverifiedAttempts;
};

const createUser = async ({
  username,
  credential,
  password,
  otp,
}: {
  username: string;
  credential: string;
  password: string;
  otp: string;
}): Promise<IUser> => {
  if (!username || !credential || !password || !otp) {
    throw error("Invalid parameters", 400);
  }

  const user = new User({ username, credential, password, otp });

  await user.save();

  return user;
};

const userService = {
  findUserByEmail,
  userExist,
  unverifiedAttempts,
  createUser,
};

export default userService;
