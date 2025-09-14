import User from "@src/model/User";
import cron, { ScheduledTask } from "node-cron";
import { isError } from "./commonTypeGuards";
import error from "./error";

const removeUnverifiedAccounts = (): ScheduledTask => {
  return cron.schedule("*/2 * * * *", async (): Promise<void> => {
    try {
      await User.deleteMany({ isVerified: false });
    } catch (err) {
      if (isError(err)) {
        throw error("Now remove unverified account!");
      }
      throw "ops";
    }
  });
};

export default removeUnverifiedAccounts;
