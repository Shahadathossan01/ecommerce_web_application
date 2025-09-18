import Product from "@src/model/Product";
import { IPath } from "@src/types/common";
import { IProduct, IProductInput } from "@src/types/product";
import error from "@src/utils/error";

const create = async ({
  category_id,
  description,
  discount,
  image,
  mrp,
  name,
  selling_price,
  status,
}: IProductInput): Promise<IProduct> => {
  const isExistProductName = await Product.findOne({ name });
  if (isExistProductName) {
    throw error(400, "Bad Request", "Product name already used");
  }

  const product = new Product({
    category_id,
    description,
    discount,
    image,
    mrp,
    name,
    selling_price,
    status,
  });

  await product.save();

  return product.toObject();
};

const updateItem = async ({
  id,
  category_id,
  description,
  discount,
  image,
  mrp,
  name,
  selling_price,
  status,
}: IProductInput & IPath): Promise<IProduct> => {
  const product = await Product.findById(id);
  if (!product) {
    throw error(404, "Not Found", "Product not found");
  }
  const payload = {
    category_id,
    description,
    discount,
    image,
    mrp,
    name,
    selling_price,
    status,
  };

  Object.assign(product, payload);
  await product.save();

  return product.toObject();
};

const removeItem = async ({ id }: IPath) => {
  const product = await Product.findById({ _id: id });
  if (!product) {
    throw error(404, "Not Found", "Product not found");
  }

  //TODO -> Delete also PRODUCT_VARIANT
  await Product.findByIdAndDelete({ _id: id });
  return;
};

const productServices = {
  create,
  updateItem,
  removeItem,
};

export default productServices;
