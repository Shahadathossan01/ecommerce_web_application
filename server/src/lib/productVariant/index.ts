import ProductVariant from "@src/model/ProductVariant";
import {
  IProductVariant,
  ProductVariantInput,
} from "@src/types/product_variant";
import error from "@src/utils/error";

const create = async ({
  color,
  images,
  product_id,
  size,
}: ProductVariantInput): Promise<IProductVariant> => {
  const existingProductVariant = await ProductVariant.find({
    product: product_id,
  }).lean();

  if (
    existingProductVariant.some(
      (variant) =>
        variant.color === color.toUpperCase() &&
        variant.size === size.toUpperCase()
    )
  ) {
    throw error(400, "Bad Request", "Color and size already used");
  }

  const productVariant = new ProductVariant({
    color: color.toUpperCase(),
    images,
    product: product_id,
    size: size.toUpperCase(),
  });

  await productVariant.save();

  return productVariant.toObject();
};

const productVariantServices = {
  create,
};

export default productVariantServices;
