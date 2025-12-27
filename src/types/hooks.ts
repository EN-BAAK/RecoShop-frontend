import { InfiniteData } from "@tanstack/react-query";

export type APIResponse<T> = {
  message: string,
  success: boolean,
  data: T
}

export type PaginatedData<T> = {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type InfiniteAPIResponse<T> =
  InfiniteData<APIResponse<PaginatedData<T>>>;

export type MutationFnType = Promise<APIResponse<unknown>>

export type UpdateItemType<T> = {
  id: number | string,
  data: Partial<T>
}

export type UpdateItemWithFormData = {
  id: number | string,
  data: FormData
}

export type GetShopProductsParams = {
  limit: number;
  offsetUnit?: number;
  category?: string;
  search?: string;
  page: number
};

export type UseGetProductsInfiniteProps = {
  limit: number;
  offsetUnit?: number;
  category?: string;
  search?: string;
};

export type UseGetProductsPaginatedByCategoryProps = {
  limit: number;
  page: number;
  category?: string;
  search?: string;
};

export type UseGetAllProductsProps = {
  limit: number,
}

export type GetUserBillProps = {
  startDate: Date,
  endDate: Date
}

export type PurchaseBill = {
  products: {
    productId: number,
    quantity?: number
  }[]
}