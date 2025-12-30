
"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { StatCardProps } from '@/types/components'

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, isLoading = false, IconClassName, gradientFrom = 'from-blue-500', gradientTo = 'to-blue-600', }) => {
  return (
    <Card className="p-6 block relative overflow-hidden transition-shadow duration-300 hover:shadow-lg z-1">
      <div className="absolute top-2 right-6 w-16 h-16 border-t-2 border-r-2 border-muted-foreground rounded-full opacity-30 -z-1" />
      <div className="absolute top-10 right-2 w-12 h-12 border-t-2 border-r-2 border-muted-foreground rounded-full opacity-20 -z-1" />
      <div className="absolute -bottom-4 -right-4 w-32 h-32 border-l-2 border-b-2 border-muted-foreground rounded-full opacity-15 -z-1" />
      <div className="absolute -bottom-8 right-20 w-20 h-20 border-t-2 border-l-2 border-muted-foreground rounded-full opacity-25 -z-1" />

      <div className="flex items-center justify-between">
        <p className="font-medium text-sm text-muted-foreground">{title}</p>

        <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} p-2 rounded-md`}>
          <Icon className={IconClassName} />
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="font-bold text-3xl text-primary">
            {value ?? 0}
          </p>
        )}
      </div>
    </Card>
  )
}

export default StatCard