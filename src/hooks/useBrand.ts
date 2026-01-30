import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand, getBrandImageById, getBrandImageByName, getAllBrandsIdentities, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { Brand } from "@/types/global";
import { APIResponse } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllBrands = () => {
  return useQuery({
    queryKey: ["da-brands"],
    queryFn: getAllBrands,
    retry: false,
  });
};

export const useGetAllBrandsIdentities = () => {
  return useQuery({
    queryKey: ["da-brands-identities"],
    queryFn: getAllBrandsIdentities,
    retry: false,
  });
};

export const useGetBrandById = (id: number) => {
  return useQuery({
    queryKey: ["da-brand", id],
    queryFn: () => getBrandById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useGetBrandImageById = (id: number) => {
  return useQuery({
    queryKey: ["da-brand-image", id],
    queryFn: () => getBrandImageById(id),
    retry: false
  })
}

export const useGetBrandImageByName = ({ name, enable = true }: { name: string, enable?: boolean }) => {
  return useQuery({
    queryKey: ["shop-brand-image", name],
    queryFn: () => getBrandImageByName(name),
    retry: false,
    enabled: enable
  })
}

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Brand>) => {
    const newBrand = data.data;

    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["da-brands"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: [newBrand, ...oldData.data],
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["da-brand-identities"] })
    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/dashboard/brands");
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

    queryClient.invalidateQueries({ queryKey: ["da-brand", updated.id] })
    queryClient.invalidateQueries({ queryKey: ["da-brand-identities"] })
    queryClient.removeQueries({ queryKey: ["da-brand-image", updated.id] })

    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["da-brands"],
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

    queryClient.invalidateQueries({ queryKey: ["da-brands", updated.id] });

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/dashboard/brands");
  };

  const onError = (error: Error) =>
    pushToast({ message: error.message, type: "ERROR" })

  return useMutation({
    mutationFn: updateBrand,
    onSuccess,
    onError
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Brand>, id: number) => {
    queryClient.setQueryData<APIResponse<Brand[]>>(
      ["da-brands"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter((b) => b.id !== id),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["da-brand", id] })
    queryClient.invalidateQueries({ queryKey: ["da-brand-image", id] })
    queryClient.invalidateQueries({ queryKey: ["da-brand-identities"] })
    pushToast({ message: data.message, type: "SUCCESS" });
  };

  const onError = (error: Error) =>
    pushToast({ message: error.message, type: "ERROR" })

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess,
    onError
  });
};
