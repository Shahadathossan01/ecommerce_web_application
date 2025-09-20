import ProductVariant from "@src/model/ProductVariant";
import { IQuery } from "@src/types/common";
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

const findAllItems = async ({
  limit,
  page,
  sort_by,
  sort_type,
  color,
  size,
  status,
}: Pick<
  IQuery,
  "page" | "limit" | "sort_type" | "sort_by" | "color" | "size" | "status"
>): Promise<IProductVariant[]> => {
  const sortStr = `${sort_type === "desc" ? "-" : ""}${sort_by}`;

  const filter: Partial<Pick<IQuery, "color" | "size" | "status">> = {};

  if (color) filter.color = color.toUpperCase();
  if (size) filter.size = size.toUpperCase();
  if (status) filter.status = status.toLowerCase();

  const productVariant = await ProductVariant.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit)
    .lean();

  return productVariant;
};

const count = async ({
  color,
  size,
  status,
}: {
  color: string;
  size: string;
  status: string;
}) => {
  const filter: Partial<Pick<IQuery, "color" | "size" | "status">> = {};

  if (color) filter.color = color.toUpperCase();
  if (size) filter.size = size.toUpperCase();
  if (status) filter.status = status.toLowerCase();

  return await ProductVariant.countDocuments(filter);
};
const productVariantServices = {
  create,
  findAllItems,
  count,
};

export default productVariantServices;
