import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UsersNumberProps } from '@/types/components'
import { Shield, UserCog } from 'lucide-react'
import React from 'react'

const UsersNumber: React.FC<UsersNumberProps> = ({ total, title, color, gradientFrom, gradientTo, isAdmin = false }) => {
  return (
    <Card className={cn(
      "bg-gradient-to-r py-2 px-4 rounded-md relative transition-shadow duration-300 overflow-hidden hover:shadow-lg",
      gradientFrom, gradientTo
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-2 rounded-md flex items-center justify-center",
          `bg-${color}`
        )}>
          {isAdmin
            // ? <Shield className={cn("w-5 h-5", `text-background`)} />
            ? <Shield className="w-5 h-5 text-background" />
            : <UserCog className="w-5 h-5 text-background" />
          }
        </div>

        <div className='text-muted-foreground'>
          <p className="font-medium text-sm">{title}</p>
          <p className="font-bold text-xs">{total}</p>
        </div>
      </div>
    </Card>
  )
}

export default UsersNumber