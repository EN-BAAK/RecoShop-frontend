export type APIResponse<T> = {
  message: string,
  success: boolean,
  data: T
}

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