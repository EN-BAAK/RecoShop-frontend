import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "@/api-client"
import { useAppContext } from "@/contexts/AppProvider"
import { BranchGlobal } from "@/types/global"
import { APIResponse } from "@/types/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useGetAllBranches = () => {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
    retry: false
  })
}

export const useGetBranchById = (id: number) => {
  return useQuery({
    queryKey: ["branches", id],
    queryFn: () => getBranchById(id),
    retry: false
  })
}

export const useCreateBranch = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<BranchGlobal>) => {
    const newBranch = data.data

    queryClient.setQueryData<APIResponse<BranchGlobal[]>>(["branches"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: [...oldData.data, newBranch],
      }
    })

    pushToast({ message: data.message, type: "SUCCESS" })
    router.push("/dashboard/branches")
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: createBranch,
    onSuccess,
    onError
  })
}

export const useUpdateBranch = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<BranchGlobal>) => {
    const updated = data.data
    queryClient.setQueryData<APIResponse<BranchGlobal[]>>(["branches"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: oldData.data.map((cat) => (cat.id === updated.id ? updated : cat))
      }
    })

    pushToast({ message: data.message, type: "SUCCESS" })
    router.push("/dashboard/branches")
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: updateBranch,
    onSuccess,
    onError
  })
}

export const useDeleteBranch = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>, id: number) => {
    queryClient.setQueryData<APIResponse<BranchGlobal[]>>(["branches"], (oldData) => {
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
    mutationFn: deleteBranch,
    onSuccess,
    onError
  })
}
