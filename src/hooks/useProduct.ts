import { getAllProducts, getProductSettingsById, createProduct, updateProduct, deleteProduct, getProductImage, getShopProductsInfinite, getShopProductsPaginatedByCategory, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { APIResponse, UseGetProductsInfiniteProps, UseGetProductsPaginatedByCategoryProps } from "@/types/hooks";
import { ProductGlobal } from "@/types/global";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["da-products"],
    queryFn: getAllProducts,
    retry: false,
  });
};

export const useGetProductsInfinite = ({ limit, category, search, offsetUnit }: UseGetProductsInfiniteProps) => {
  return useInfiniteQuery({
    queryKey: ["da-products-infinite", category, search],
    queryFn: ({ pageParam = 0 }) =>
      getShopProductsInfinite({ limit, page: pageParam, category, search, offsetUnit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore ? lastPage.data.nextPage : undefined,
    retry: false,
  })
};

export const useGetProductsPaginatedByCategory = ({ limit, page, category, search, }: UseGetProductsPaginatedByCategoryProps) => {
  return useQuery({
    queryKey: ["shop-products", category, search, page],
    queryFn: () =>
      getShopProductsPaginatedByCategory({ limit, page, category, search, }),
    retry: false,
  });
};

export const useGetProductSettingsById = (id: number) => {
  return useQuery({
    queryKey: ["da-product-settings", id],
    queryFn: () => getProductSettingsById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useGetProductImage = (id: number) => {
  return useQuery({
    queryKey: ["da-product-image", id],
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
      ["da-products"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newProduct, ...oldData.data],
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
    router.push("/dashboard/products");
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

    queryClient.invalidateQueries({ queryKey: ["da-product-settings", updatedProduct.id] })
    queryClient.removeQueries({ queryKey: ["da-product-image", updatedProduct.id] })

    queryClient.setQueryData<APIResponse<ProductGlobal[]>>(
      ["da-products"],
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
    router.push("/dashboard/products");
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
      ["da-products"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== id),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["da-product-settings", id] })
    queryClient.invalidateQueries({ queryKey: ["da-product-image", id] })
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
