"use client"

import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "@/api-client"
import { useAppContext } from "@/contexts/AppProvider"
import { APIResponse } from "@/types/hooks"
import { Category, } from "@/types/global"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    retry: false
  })
}

export const useGetCategoryById = (id: number) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
    retry: false
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<Category>) => {
    const newCategory = data.data

    queryClient.setQueryData<APIResponse<Category[]>>(["categories"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: [newCategory, ...oldData.data],
      }
    })

    pushToast({ message: data.message, type: "SUCCESS" })
    router.push("/categories")
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: createCategory,
    onSuccess,
    onError
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<Category>) => {
    const updated = data.data
    queryClient.setQueryData<APIResponse<Category[]>>(["categories"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: oldData.data.map((cat) => (cat.id === updated.id ? updated : cat))
      }
    })

    queryClient.invalidateQueries({ queryKey: ["categories", updated.id] })
    pushToast({ message: data.message, type: "SUCCESS" })
    router.push("/categories")
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: updateCategory,
    onSuccess,
    onError
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>, id: number) => {
    queryClient.setQueryData<APIResponse<Category[]>>(["categories"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: oldData.data.filter((cat) => cat.id !== id)
      }
    })
    pushToast({ message: data.message, type: "SUCCESS" })
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess,
    onError
  })
}
