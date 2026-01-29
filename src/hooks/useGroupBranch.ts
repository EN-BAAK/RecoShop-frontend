import { createGroupBranch, deleteGroupBranch, getAllGroupBranches, getGroupBranchById, updateGroupBranch } from "@/api-client"
import { useAppContext } from "@/contexts/AppProvider"
import { GroupBranch } from "@/types/global"
import { APIResponse } from "@/types/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useGetAllGroupsBranches = () => {
  return useQuery({
    queryKey: ["da-group-branches"],
    queryFn: getAllGroupBranches,
    retry: false
  })
}

export const useGetAllGroupsBranchById = (id: number) => {
  return useQuery({
    queryKey: ["da-group-branches", id],
    queryFn: () => getGroupBranchById(id),
    retry: false
  })
}

export const useCreateGroupBranch = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<GroupBranch>) => {
    const newBranch = data.data

    queryClient.setQueryData<APIResponse<GroupBranch[]>>(["da-group-branches"], (oldData) => {
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
    mutationFn: createGroupBranch,
    onSuccess,
    onError
  })
}

export const useUpdateGroupBranch = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<GroupBranch>) => {
    const updated = data.data
    queryClient.setQueryData<APIResponse<GroupBranch[]>>(["da-group-branches"], (oldData) => {
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
    mutationFn: updateGroupBranch,
    onSuccess,
    onError
  })
}

export const useDeleteGroupBranch = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>, id: number) => {
    queryClient.setQueryData<APIResponse<GroupBranch[]>>(["da-group-branches"], (oldData) => {
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
    mutationFn: deleteGroupBranch,
    onSuccess,
    onError
  })
}
