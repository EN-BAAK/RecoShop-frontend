import { getAllProducts, getProductSettingsById, createProduct, updateProduct, deleteProduct, getProductImage, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { APIResponse } from "@/types/hooks";
import { ProductGlobal } from "@/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    retry: false,
  });
};

export const useGetProductSettingsById = (id: number) => {
  return useQuery({
    queryKey: ["product-settings", id],
    queryFn: () => getProductSettingsById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useGetProductImage = (id: number) => {
  return useQuery({
    queryKey: ["product-image", id],
    queryFn: () => getProductImage(id),
    retry: false
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<ProductGlobal>) => {
    const newProduct = data.data;

    queryClient.setQueryData<APIResponse<ProductGlobal[]>>(
      ["products"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newProduct, ...oldData.data],
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/products");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: createProduct,
    onSuccess,
    onError,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<ProductGlobal>) => {
    const updatedProduct = data.data;

    queryClient.invalidateQueries({ queryKey: ["product-settings", updatedProduct.id] })
    queryClient.removeQueries({ queryKey: ["product-image", updatedProduct.id] })

    queryClient.setQueryData<APIResponse<ProductGlobal[]>>(
      ["products"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/products");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: updateProduct,
    onSuccess,
    onError,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<ProductGlobal>, id: number) => {
    queryClient.setQueryData<APIResponse<ProductGlobal[]>>(
      ["products"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== id),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["product-settings", id] })
    queryClient.invalidateQueries({ queryKey: ["product-image", id] })
    pushToast({ message: data.message, type: "SUCCESS" });
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess,
    onError,
  });
};
