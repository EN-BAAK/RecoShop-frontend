import { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { APIResponse } from "@/types/hooks";
import { SubCategoryGlobal, } from "@/types/global";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllSubCategories = () => {
  return useQuery({
    queryKey: ["sub-categories"],
    queryFn: getAllSubCategories,
    retry: false,
  });
};

export const useGetSubCategoryById = (id: number) => {
  return useQuery({
    queryKey: ["sub-categories", id],
    queryFn: () => getSubCategoryById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<SubCategoryGlobal>) => {
    const newSubCategory = data.data;

    queryClient.setQueryData<APIResponse<SubCategoryGlobal[]>>(
      ["sub-categories"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newSubCategory, ...oldData.data],
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/sub-categories");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: createSubCategory,
    onSuccess,
    onError,
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<SubCategoryGlobal>) => {
    const updated = data.data;

    queryClient.setQueryData<APIResponse<SubCategoryGlobal[]>>(
      ["sub-categories"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((sub) =>
            sub.id === updated.id ? updated : sub
          ),
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/sub-categories");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: updateSubCategory,
    onSuccess,
    onError,
  });
};

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<SubCategoryGlobal>, id: number) => {
    queryClient.setQueryData<APIResponse<SubCategoryGlobal[]>>(
      ["sub-categories"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((sub) => sub.id !== id),
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: deleteSubCategory,
    onSuccess,
    onError,
  });
};
