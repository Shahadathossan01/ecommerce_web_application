import Category from "@src/model/Category";
import {
  CategoryInput,
  CategoryQuery,
  ICategory,
  UpdateCategoryBody,
  CategoryParams,
} from "@src/types/category";
import error from "@src/utils/error";

const create = async ({ name }: CategoryInput): Promise<ICategory> => {
  if (!name) {
    throw error(400, "Bad Request", "Invalid Parameters");
  }

  const existingCatetory = await Category.findOne({ name });
  if (existingCatetory) {
    throw error(400, "Bad Request", "Category name already exists");
  }

  const category = new Category({
    name,
  });

  await category.save();

  return category.toObject();
};

const findAllItems = async ({
  page,
  limit,
  sort_type,
  sort_by,
  search,
}: CategoryQuery): Promise<ICategory[]> => {
  const sortStr = `${sort_type === "desc" ? "-" : ""}${sort_by}`;
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  const categories = await Category.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return categories.map((category) => category.toObject());
};

const count = ({ search = "" }) => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  return Category.countDocuments(filter);
};

const updateItem = async ({
  id,
  name,
}: CategoryParams & UpdateCategoryBody): Promise<ICategory> => {
  const category: ICategory | null = await Category.findById(id);

  if (!category) {
    throw error(404, "Not Found", "Category not found");
  }

  const existing = await Category.findOne({ name, _id: { $ne: id } });
  if (existing) {
    throw error(400, "Bad Request", "Category name already exists");
  }

  category.name = name;

  await category.save();
  return category.toObject();
};

const removeItem = async ({
  id,
}: CategoryParams): Promise<ICategory | null> => {
  const category = await Category.findById({ _id: id });
  if (!category) {
    throw error(404, "Not Found", "Category not found");
  }

  const deleted = await Category.findByIdAndDelete({ _id: id });

  return deleted;
};

const categoryService = {
  create,
  findAllItems,
  count,
  updateItem,
  removeItem,
};

export default categoryService;
