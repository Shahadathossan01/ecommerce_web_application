import { CustomError } from "../error";

export function isCustomError(err: unknown): err is CustomError {
  return (
    err instanceof Error &&
    "status" in err &&
    typeof (err as CustomError).status === "number"
  );
}
