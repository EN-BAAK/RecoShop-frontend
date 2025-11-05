import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, } from "@/api-client";
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

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    retry: false,
  });
};

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
