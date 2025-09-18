import productServices from "@src/lib/product";
import { IPath } from "@src/types/common";
import { Request, Response, NextFunction } from "express";

const removeItem = async (
  req: Request<IPath>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await productServices.removeItem({ id });

    res.status(204).end();
  } catch (e: unknown) {
    next(e);
  }
};

export default removeItem;
