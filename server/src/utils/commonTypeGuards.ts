import { ZodError } from "zod";
import { CustomError } from "./error";

export function isCustomError(err: unknown): err is CustomError {
  return (
    err instanceof Error &&
    "status" in err &&
    typeof (err as CustomError).status === "number"
  );
}

export const isError = (err: unknown): err is Error => {
  return err instanceof Error;
};

export const isZodError = (err: unknown): err is ZodError => {
  return err instanceof ZodError;
};
