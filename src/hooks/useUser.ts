import { deleteUser, getAllUsers, getUserById, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { User } from "@/types/global";
import { APIResponse } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllUsers = (isVerified?: boolean) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(isVerified),
    retry: false,
  });
};

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<User>, id: number) => {
    queryClient.setQueryData<APIResponse<User[]>>(
      ["users"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== id),
        };
      }
    );
    pushToast({ message: data.message, type: "SUCCESS" });
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: deleteUser,
    onSuccess,
    onError,
  });
};
