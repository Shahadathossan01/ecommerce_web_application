import ProductVariant from "@src/model/ProductVariant";
import {
  IProductVariant,
  ProductVariantInput,
} from "@src/types/product_variant";

const create = async ({
  color,
  images,
  product_id,
  size,
}: ProductVariantInput): Promise<IProductVariant> => {
  const productVariant = new ProductVariant({
    color,
    images,
    product: product_id,
    size,
  });

  await productVariant.save();

  return productVariant.toObject();
};

const productVariantServices = {
  create,
};

export default productVariantServices;
