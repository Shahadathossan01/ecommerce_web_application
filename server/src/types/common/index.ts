import sharedValiations from "@src/validations/shared";
import z from "zod";

export interface Pagination {
  page: number;
  limit: number;
  next?: number;
  prev?: number;
  totalPage: number;
  totalItems: number;
}

export interface Links {
  self: string;
  [key: string]: string | undefined | null;
}

//Used->GET
export interface GetResponse<T = unknown> {
  data: T;
  pagination?: Pagination;
  links?: Links;
}

//Used->POST,PATCH,DELETE
export interface MutateResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
  links: Links;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  code: number;
  error: string;
  message?: string;
  data?: FieldError[];
}

export type IConfig = {
  page: number;
  limit: number;
  totalItems: number;
  sort_type: string;
  sort_by: string;
  search: string;
};

export type IPath = z.infer<typeof sharedValiations.pathSchema>;
