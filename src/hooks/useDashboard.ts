import { getDashboardData } from "@/api-client"
import { useQuery } from "@tanstack/react-query"

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["da-dashboard-data"],
    queryFn: () => getDashboardData(),
    retry: false,
  })
}