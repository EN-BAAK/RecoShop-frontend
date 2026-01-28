"use client"

import React from 'react'
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useGetPurchasesProductByMonth } from "@/hooks/useProduct"
import { Skeleton } from "@/components/ui/skeleton"
import { PackageX } from 'lucide-react'

const PurchasesDashboardChart: React.FC = () => {
  const { data, isFetching, isError } = useGetPurchasesProductByMonth()
  const purchases = data?.data
  const chartData = purchases?.currentMonth.map((item: { day: number, count: number }, index: number) => ({
    day: item.day,
    currentMonth: item.count,
    lastMonth: purchases.lastMonth[index]?.count ?? 0,
  }))

  return (
    <Card className="h-[300px] p-6 block col-span-1 md:col-span-2 xl:col-span-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      {isFetching ? <Skeleton className="w-full h-full rounded-md" />
        : (isError || !chartData) ? <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <PackageX className="w-10 h-10" />
          <p className="font-medium text-sm text-center">
            No data available
          </p>
        </div>
          : <React.Fragment>
            <h3 className="mb-1 font-semibold text-lg text-foreground">Purchases Comparison</h3>

            <CardContent className="h-[220px] p-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="currentShadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="lastShadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="currentMonth"
                    name="Current Month"
                    stroke="#4CAF50"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="lastMonth"
                    name="Last Month"
                    stroke="#DC2626"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />

                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </React.Fragment>
      }
    </Card >
  )
}

export default PurchasesDashboardChart