import { ICategory } from "@src/types/category";
import error from "./error";
import defaults from "../../src/config/defaults";
import { Pagination } from "@src/types/common";
import generateQueryString from "./qs";

type GetTransformedItems = {
  items: ICategory[];
  selection: string[];
  path?: string;
};
type FullCategoryWithLink = ICategory & { link: string };

type PartialCategoryWithLink = Record<string, unknown> & { link: string };

type ResponseTransformedItems = (
  | FullCategoryWithLink
  | PartialCategoryWithLink
)[];

type IGetPagination = {
  totalItems: number;
  limit: number;
  page: number;
};

type HATEOASLinks = {
  self: string;
  next?: string;
  prev?: string;
};

const getTransformedItems = ({
  items = [],
  selection = [],
  path = "/",
}: GetTransformedItems): ResponseTransformedItems => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw error(400, "Invalid selection", "Provide valid parameters");
  }

  if (selection.length === 0) {
    return items.map((item) => ({
      ...item,
      link: `${path}/${item._id}`,
    }));
  }

  return items.map((item) => {
    const result: PartialCategoryWithLink = { link: `${path}/${item._id}` };
    selection.forEach((key) => {
      result[key] = (item as any)[key];
    });
    return result;
  });
};

const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page,
}: IGetPagination): Pagination => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination: Pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }
  if (page > 1) {
    pagination.prev = page - 1;
  }
  return pagination;
};

const getHATEOASForAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}): HATEOASLinks => {
  const links: HATEOASLinks = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({
      ...query,
      page: page + 1,
    });
    links.next = `${path}?${queryStr}`;
  }
  if (hasPrev) {
    const queryStr = generateQueryString({
      ...query,
      page: page - 1,
    });
    links.prev = `${path}?${queryStr}`;
  }
  return links;
};

const query = {
  getTransformedItems,
  getPagination,
  getHATEOASForAllItems,
};

export default query;
