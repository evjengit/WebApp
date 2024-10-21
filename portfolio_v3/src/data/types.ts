import { Pagination } from "../lib/query";

export type User = {
  id: string;
  email: string;
  name: string;
  admin: string;
};

export type ContextVariables = {
  user: User | null;
};

export type Result<T> =
  | {
      success: true;
      data: T;
      pagination?: Pagination;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };