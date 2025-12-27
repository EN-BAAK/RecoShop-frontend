import { getUserBills, purchaseBill } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { Bill } from "@/types/global";
import { APIResponse, GetUserBillProps } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserBills = ({ endDate, startDate }: GetUserBillProps) => {
  return useQuery({
    queryKey: ["user-bills", { endDate, startDate }],
    queryFn: () => getUserBills({ endDate, startDate }),
    retry: false,
  });
};

export const usePurchaseBill = () => {
  const queryClient = useQueryClient()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<Bill>) => {
    const newBill = data.data

    queryClient.setQueryData<APIResponse<Bill[]>>(
      ["user-bills"],
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          data: [newBill, ...oldData.data],
        }
      }
    )

    pushToast({ message: data.message, type: "SUCCESS" })
  }

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: purchaseBill,
    onSuccess,
    onError,
  })
}