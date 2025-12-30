"use client"
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { PurchasesDashboardChartProps } from '@/types/components'
import React from 'react'

const PurchasesDashboardChart: React.FC<PurchasesDashboardChartProps> = ({ purchases }) => {
  return (
    <Card className="h-[300px] p-6 block col-span-1 md:col-span-2 xl:col-span-3 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <h3 className="mb-1 font-semibold text-lg text-foreground">Purchases Comparison</h3>

      <CardContent className="h-[220px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={purchases}>
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
    </Card>
  )
}

export default PurchasesDashboardChart