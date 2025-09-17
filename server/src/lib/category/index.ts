import Category from "@src/model/Category";
import { CategoryInput, ICategory } from "@src/types/category";
import error from "@src/utils/error";

const create = async ({ name }: CategoryInput): Promise<ICategory> => {
  if (!name) {
    throw error(400, "Bad Request", "Invalid Parameters");
  }

  const category = new Category({
    name,
  });

  await category.save();

  return category.toObject();
};

const categoryService = {
  create,
};

export default categoryService;
