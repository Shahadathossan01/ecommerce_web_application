import Product from "@src/model/Product";
import { IProduct, IProductCreateInput } from "@src/types/product";
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
}: IProductCreateInput): Promise<IProduct> => {
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

const productServices = {
  create,
};

export default productServices;
