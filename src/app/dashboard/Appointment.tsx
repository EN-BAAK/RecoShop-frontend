import React from 'react'
import UsersNumber from './UsersNumber'
import { Card } from '@/components/ui/card'
import { useGetAdminsAndManagers } from '@/hooks/useUser'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/types/global'
import { PackageX } from 'lucide-react'

const Appointment: React.FC = () => {
  const { data, isFetching, isError } = useGetAdminsAndManagers()

  const adminsCount = data?.data?.filter((user: User) => user.role === 'ADMIN').length || 0
  const managersCount = data?.data?.filter((user: User) => user.role === 'MANAGER').length || 0

  const usersNumber = [
    {
      title: "Total Admin",
      total: adminsCount,
      color: "red-600",
      gradientFrom: "from-red-200",
      gradientTo: "to-red-400",
      isAdmin: true
    },
    {
      title: "Total Managers",
      total: managersCount,
      color: "blue-600",
      gradientFrom: "from-blue-200",
      gradientTo: "to-blue-400",
      isAdmin: false
    }
  ]

  return (
    <Card className="h-[250px] p-6 col-span-1 md:col-span-2 xl:col-span-1 transition-shadow duration-300 hover:shadow-lg">
      {isFetching ? <Skeleton className="w-full h-full rounded-md" />
        : (isError || !data.data) ? <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <PackageX className="w-10 h-10" />
          <p className="font-medium text-sm text-center">
            No data available
          </p>
        </div>
          : <React.Fragment>
            <h3 className='mb-1 font-semibold text-lg text-muted-foreground'>Appointments</h3>

            <div className="flex-1 flex flex-col justify-between">
              {
                usersNumber.map((userNum) => (
                  <UsersNumber
                    color={userNum.color}
                    total={userNum.total}
                    isAdmin={userNum.isAdmin}
                    key={userNum.title}
                    title={userNum.title}
                    gradientFrom={userNum.gradientFrom}
                    gradientTo={userNum.gradientTo}
                  />
                ))}
            </div></React.Fragment>}
    </Card>
  )
}

export default Appointment