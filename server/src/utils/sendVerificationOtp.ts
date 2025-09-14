import { isError } from "./commonTypeGuards";
import error from "./error";
import generateEmailTemplate from "./generateEmailTemplate";
import isEmailOrPhone from "./isEmailOrPhone";
import { sendEmail } from "./sendEmail";

type Inputs = {
  otp: string;
  credential: string;
};

const sendVerificationOtp = async ({ otp, credential }: Inputs) => {
  const method = isEmailOrPhone(credential);

  if (method === "email") {
    const message = generateEmailTemplate(otp);
    const subject = `Your verification OTP from Solid Buy`;
    try {
      await sendEmail({ credential, subject, message });
    } catch (err) {
      if (isError(err)) {
        throw error("Sorry to send your otp. Try again");
      }
      throw "ops";
    }
  }
};
