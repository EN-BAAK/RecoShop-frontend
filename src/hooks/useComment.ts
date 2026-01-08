import { getProductComments, postComment } from "@/api-client"
import { useAppContext } from "@/contexts/AppProvider"
import { Comment } from "@/types/global";
import { APIResponse, PostCommentProps } from "@/types/hooks"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetProductComments = ({ productId, limit }: { productId: number, limit: number }) => {
  return useInfiniteQuery({
    queryKey: ["product-comments", productId],
    queryFn: ({ pageParam = 1 }) => getProductComments(productId, limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.hasMore ? lastPage.data.nextPage : undefined,
    enabled: !!productId,
    retry: false,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<Comment>, variables: PostCommentProps) => {
    queryClient.invalidateQueries({
      queryKey: ["product-comments", variables.productId],
    })

    pushToast({
      message: data.message,
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
    mutationFn: postComment,
    onSuccess,
    onError,
  })
}
