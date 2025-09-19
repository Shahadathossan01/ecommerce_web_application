import create from "./create";
import removeItem from "./removeItem";
import createReviewByProductId from "./createReviewByProductId";
import updateItem from "./updateItem";
import findAllReviewsByProductId from "./findAllReviewsByProductId";
findAllReviewsByProductId;
const productControllers = {
  create,
  updateItem,
  removeItem,
  createReviewByProductId,
  findAllReviewsByProductId,
};

export default productControllers;
