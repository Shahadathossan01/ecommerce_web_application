import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

// Apply to forgotPassword route
export const forgotPasswordLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    code: 429,
    message: "Too many password reset attempts, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

export default forgotPasswordLimiter;
