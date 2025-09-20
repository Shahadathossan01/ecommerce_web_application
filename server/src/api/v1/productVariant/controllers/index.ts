import create from "./create";
import findAllItems from "./findAllItems";
import findAllProductVariantColors from "./findAllProductVariantColors";
import findAllProductVariantSizes from "./findAllProductVariantSizes";
import removeItem from "./removeItem";
import updateItem from "./updateItem";
const productVariantControllers = {
  create,
  findAllItems,
  updateItem,
  removeItem,
  findAllProductVariantColors,
  findAllProductVariantSizes,
};

export default productVariantControllers;
