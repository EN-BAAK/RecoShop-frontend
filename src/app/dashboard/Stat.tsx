import { Briefcase, Package, UserCheck, Users } from 'lucide-react'
import React from 'react'
import StatCard from './StatCard'
import { useGetDashboardData } from '@/hooks/useDashboard'

const Stat: React.FC = () => {
  const { data, isFetching } = useGetDashboardData()

  const stats = [
    {
      title: 'Total Products',
      value: data?.data.totalProducts,
      Icon: Package,
      IconClassName: 'w-8 h-8 text-white',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
    },
    {
      title: 'Total Brands',
      value: data?.data.totalBrands,
      Icon: Briefcase,
      IconClassName: 'w-8 h-8 text-white',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
    },
    {
      title: 'Verified Users',
      value: data?.data.totalVerifiedUsers,
      Icon: UserCheck,
      IconClassName: 'w-8 h-8 text-white',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-emerald-600',
    },
    {
      title: 'Unverified Users',
      value: data?.data.totalUnverifiedUsers,
      Icon: Users,
      IconClassName: 'w-8 h-8 text-white',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-orange-600',
    },
  ]

  return (
    <React.Fragment>
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          Icon={stat.Icon}
          IconClassName='text-background'
          isLoading={!isFetching}
          gradientFrom={stat.gradientFrom}
          gradientTo={stat.gradientTo}
        />
      ))}
    </React.Fragment>
  )
}

export default Stat