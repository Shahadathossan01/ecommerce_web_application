import register from "./register";
import verifyRegisterOtp from "./verifyRegisterOtp";
import login from "./login";
import resendOtp from "./resendOtp";
import forgotPassword from "./forgotPassword";
import verifyResetOtp from "./verifyResetOtp";
import resetPassword from "./resetPassword";

const authControllers = {
  register,
  verifyRegisterOtp,
  login,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
};

export default authControllers;
