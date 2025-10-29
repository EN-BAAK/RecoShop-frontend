export type APIResponse<T> = {
  message: string,
  success: boolean,
  data: T
}

export type MutationFnType = Promise<APIResponse<unknown>>

export type UpdateItemFormData<T> = {
  id: number | string,
  data: Partial<T>
}