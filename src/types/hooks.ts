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