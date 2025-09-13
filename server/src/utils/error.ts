export type CustomError = Error & { status: number };

function error(
  msg: string = "Something went wrong",
  status = 500
): CustomError {
  const e = new Error(msg) as CustomError;
  e.status = status;
  return e;
}

export default error;
