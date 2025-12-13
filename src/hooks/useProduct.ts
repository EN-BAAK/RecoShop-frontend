import { getAllProducts, getProductSettingsById, createProduct, updateProduct, deleteProduct, getProductImage, getShopProductsPaginatedByCategory, } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { APIResponse, InfiniteAPIResponse, UseGetAllProductsProps, UseGetProductsPaginatedByCategoryProps } from "@/types/hooks";
import { ProductGlobal } from "@/types/global";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllProducts = ({ limit }: UseGetAllProductsProps) => {
  return useInfiniteQuery({
    queryKey: ["da-products"],
    queryFn: ({ pageParam = 1 }) => getAllProducts(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.hasMore ? lastPage.data.nextPage : undefined,
    retry: false,
  });
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

export const useGetProductImage = ({ id, enable = true }: { id: number, enable?: boolean }) => {
  return useQuery({
    queryKey: ["da-product-image", id],
    queryFn: () => getProductImage(id),
    retry: false,
    enabled: enable
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<ProductGlobal>) => {
    const newProduct = data.data;

    queryClient.setQueryData<InfiniteAPIResponse<ProductGlobal>>(
      ["da-products"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index !== 0) return page;

            return {
              ...page,
              data: {
                ...page.data,
                items: [newProduct, ...page.data.items],
                totalCount: page.data.totalCount + 1,
              },
            };
          }),
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

    queryClient.invalidateQueries({
      queryKey: ["da-product-settings", updatedProduct.id],
    });

    queryClient.removeQueries({
      queryKey: ["da-product-image", updatedProduct.id],
    });

    queryClient.setQueryData<InfiniteAPIResponse<ProductGlobal>>(
      ["da-products"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((p: ProductGlobal) =>
                p.id === updatedProduct.id ? updatedProduct : p
              ),
            },
          })),
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
    queryClient.setQueryData<InfiniteAPIResponse<ProductGlobal>>(
      ["da-products"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.filter(
                (p: ProductGlobal) => p.id !== id
              ),
            },
          })),
        };
      }
    );

    queryClient.invalidateQueries({ queryKey: ["da-product-settings", id] });
    queryClient.invalidateQueries({ queryKey: ["da-product-image", id] });

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
