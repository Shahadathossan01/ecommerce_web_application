import User from "@src/model/User";
import { IUser } from "@src/types/auth";
import error from "@src/utils/error";
import { SortOrder } from "mongoose";
const findUserByEmail = async (credential: string): Promise<IUser | null> => {
  const user = await User.findOne({ credential, isVerified: true });
  return user ? user : null;
};

const userExist = async (credential: string): Promise<boolean> => {
  const user: IUser | null = await findUserByEmail(credential);
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
  hashedOtp,
}: {
  username: string;
  credential: string;
  password: string;
  hashedOtp: string;
}): Promise<IUser> => {
  if (!username || !credential || !password || !hashedOtp) {
    throw error(400, "Invalid parameters", "Please provide valid inputs");
  }

  const user = new User({ username, credential, password, otp: hashedOtp });

  await user.save();

  return user;
};

const findAllUser = async ({
  credential,
  isVerified = true,
  sortValue,
}: {
  credential: string;
  isVerified: boolean;
  sortValue: SortOrder;
}): Promise<IUser[]> => {
  const user: IUser[] = await User.find({ credential, isVerified }).sort({
    createdAt: sortValue,
  });
  return user;
};

const userService = {
  findUserByEmail,
  userExist,
  unverifiedAttempts,
  createUser,
  findAllUser,
};

export default userService;
