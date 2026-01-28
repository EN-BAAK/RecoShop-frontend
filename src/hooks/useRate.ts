import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMyRateForProduct, rateProduct } from "@/api-client"
import { APIResponse, RateProductProps } from "@/types/hooks"
import { useAppContext } from "@/contexts/AppProvider"

export const useGetMyRateForProduct = (productId: number) => {
  return useQuery({
    queryKey: ["product-my-rate", productId],
    queryFn: () => getMyRateForProduct(productId),
    enabled: !!productId,
    retry: false,
  })
}

export const useRateProduct = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (
    data: APIResponse<unknown>,
    variables: RateProductProps
  ) => {
    const { productId } = variables

    queryClient.invalidateQueries({ queryKey: ["product-my-rate", productId] })

    pushToast({
      message: data.message || "Product rated successfully",
      type: "SUCCESS",
    })
  }

  const onError = (error: Error) => {
    pushToast({
      message: error.message,
      type: "ERROR",
    })
  }

  return useMutation({
    mutationFn: rateProduct,
    onSuccess,
    onError,
  })
}