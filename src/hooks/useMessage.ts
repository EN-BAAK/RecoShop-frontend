import { deleteMessage, getAllMessages, postMessage } from "@/api-client"
import { useAppContext } from "@/contexts/AppProvider"
import { Message } from "@/types/global"
import { APIResponse } from "@/types/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetAllMessages = () => {
  return useQuery({
    queryKey: ["da-messages"],
    queryFn: getAllMessages,
    retry: false
  })
}

export const usePostMessage = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<Message>) => {
    const newMessage = data.data

    queryClient.setQueryData<APIResponse<Message[]>>(["da-messages"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        data: [newMessage, ...oldData.data],
      }
    })

    pushToast({ message: data.message, type: "SUCCESS" })
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: postMessage,
    onSuccess,
    onError
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<Message>, id: number) => {
    queryClient.setQueryData<APIResponse<Message[]>>(
      ["da-messages"],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter((b) => b.id !== id),
        };
      }
    );

    pushToast({ message: data.message, type: "SUCCESS" });
  };

  const onError = (error: Error) =>
    pushToast({ message: error.message, type: "ERROR" })

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess,
    onError
  });
};
