import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand, getBrandImageById, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { Brand } from "@/types/global";
import { APIResponse } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    retry: false,
  });
};

export const useGetBrandById = (id: number) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrandById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useGetBrandImage = (id: number) => {
  return useQuery({
    queryKey: ["brand-image", id],
    queryFn: () => getBrandImageById(id),
    retry: false
  })
}

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Brand>) => {
    const newBrand = data.data;

    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["brands"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: [newBrand, ...oldData.data],
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/brands");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: createBrand,
    onSuccess,
    onError,
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Brand>) => {
    const updated = data.data;

    queryClient.invalidateQueries({ queryKey: ["brand", updated.id] })
    queryClient.removeQueries({ queryKey: ["brand-image", updated.id] })

    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["brands"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((brand) =>
            brand.id === updated.id ? updated : brand
          ),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["brands", updated.id] });

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/brands");
  };

  return useMutation({
    mutationFn: updateBrand,
    onSuccess,
    onError: (error: Error) =>
      pushToast({ message: error.message, type: "ERROR" }),
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Brand>, id: number) => {
    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["brands"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter((b) => b.id !== id),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["brand", id] })
    queryClient.invalidateQueries({ queryKey: ["brand-image", id] })
    pushToast({ message: data.message, type: "SUCCESS" });
  };

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess,
    onError: (error: Error) =>
      pushToast({ message: error.message, type: "ERROR" }),
  });
};
