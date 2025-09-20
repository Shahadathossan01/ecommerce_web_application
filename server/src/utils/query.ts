import { ICategory } from "@src/types/category";
import error from "./error";
import defaults from "../../src/config/defaults";
import { Pagination } from "@src/types/common";
import generateQueryString from "./qs";

interface LinkConfig {
  path: string;
  key: string;
  property: string;
}

type GetTransformedItems = {
  items: object[];
  selection: string[];
  path?: string;
  links?: LinkConfig[];
};

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
  links = [],
}: GetTransformedItems) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw error(400, "Invalid selection", "Provide valid parameters");
  }

  return items.map((item) => {
    const result: any = {};
    selection.forEach((key) => {
      (result as any)[key] = (item as any)[key];
    });
    result.links = {};
    links.forEach(({ path, key, property }) => {
      result.links[key] = `${path}/${(item as any)[property]}`;
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
    page: Number(page),
    limit: Number(limit),
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = Number(page) + 1;
  }
  if (page > 1) {
    pagination.prev = Number(page) - 1;
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
