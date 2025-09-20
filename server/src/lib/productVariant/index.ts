import ProductVariant from "@src/model/ProductVariant";
import { IPath, IQuery } from "@src/types/common";
import {
  IProductVariant,
  ProductVariantInput,
} from "@src/types/product_variant";
import error from "@src/utils/error";

const create = async ({
  color,
  images,
  product,
  size,
}: ProductVariantInput): Promise<IProductVariant> => {
  const existingProductVariant = await ProductVariant.find({
    product,
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
    product,
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

const updateItem = async ({
  color,
  images,
  product,
  size,
  id,
}: ProductVariantInput & IPath) => {
  const productVariant = await ProductVariant.findById({ _id: id });

  if (!productVariant) {
    throw error(404, "Not Found", "Product variant not found");
  }

  const productId = product ?? productVariant._id;
  const newColor = (color ?? productVariant.color).toUpperCase();
  const newSize = (size ?? productVariant.size).toUpperCase();

  const existingProductVariant = await ProductVariant.find({
    product: productId,
  }).lean();

  if (
    existingProductVariant.some(
      (variant) =>
        variant.color === newColor.toUpperCase() &&
        variant.size === newSize.toUpperCase()
    )
  ) {
    throw error(400, "Bad Request", "Color and size already used");
  }

  const payload = {
    color: color.toUpperCase(),
    images,
    product,
    size: size.toUpperCase(),
  };

  Object.assign(productVariant, payload);
  await productVariant.save();

  return productVariant.toObject();
};

const removeItem = async ({ id }: IPath) => {
  const productVariant = await ProductVariant.findById({ _id: id });

  if (!productVariant) {
    throw error(404, "Not Found", "Product variant not found");
  }

  return await ProductVariant.findOneAndDelete({ _id: id });
};

const findAllProductVariantColors = async (): Promise<string[]> => {
  const productVariants: IProductVariant[] = await ProductVariant.find().lean();

  const productVariantColors = productVariants.reduce((acc: string[], cur) => {
    if (!acc.includes(cur.color)) {
      acc.push(cur.color);
    }
    return acc;
  }, [] as string[]);

  return productVariantColors;
};
const findAllProductVariantSizes = async (): Promise<string[]> => {
  const productVariants: IProductVariant[] = await ProductVariant.find().lean();

  const productVariantSizes = productVariants.reduce((acc: string[], cur) => {
    if (!acc.includes(cur.size)) {
      acc.push(cur.size);
    }
    return acc;
  }, [] as string[]);

  console.log("called", productVariantSizes);
  return productVariantSizes;
};

const productVariantServices = {
  create,
  findAllItems,
  count,
  updateItem,
  removeItem,
  findAllProductVariantColors,
  findAllProductVariantSizes,
};

export default productVariantServices;
