import { deleteUser, getAllUsers, getUserById, getUserProfile, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { User } from "@/types/global";
import { APIResponse } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllUsers = (isVerified?: boolean) => {
  return useQuery({
    queryKey: ["da-users"],
    queryFn: () => getAllUsers(isVerified),
    retry: false,
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["authenticated-user-profile"],
    queryFn: getUserProfile,
    retry: false,
    gcTime: 0,
    staleTime: 0
  });
};

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["da-users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<User>, id: number) => {
    queryClient.setQueryData<APIResponse<User[]>>(
      ["da-users"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== id),
        };
      }
    );

    router.push("/dashboard/users")
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
