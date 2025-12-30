"use client"

import React from 'react'
import PageHolder from './DashboardPageHolder'
import { useGetDashboardData } from '@/hooks/useDashboard'
import { Users, UserCheck, Package, Briefcase } from 'lucide-react'
import StatCard from './StatCard'
import LoadingPage from '@/components/LoadingPage'
import ErrorPage from '@/components/ErrorPage'
import EmptyElement from '@/components/EmptyElement'
import { User } from '@/types/global'
import AdminsManagersTable from './AdminManagerTable'
import UsersNumber from './UsersNumber'
import { Card } from '@/components/ui/card'
import PurchasesDashboardChart from './PurchasesChart'
import ProductDashboardCard from './ProductDashboardCard'

const DashboardPage = () => {
  const { data, isFetching, isError, error, refetch } = useGetDashboardData()

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

  const adminAndManagers = data?.data.adminsAndManagers || []

  const adminsCount = data?.data.adminsAndManagers?.filter((user: User) => user.role === 'ADMIN').length || 0
  const managersCount = data?.data.adminsAndManagers?.filter((user: User) => user.role === 'MANAGER').length || 0

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

  const purchases = data?.data.purchases

  const chartData = purchases?.currentMonth.map((item: { day: number, count: number }, index: number) => ({
    day: item.day,
    currentMonth: item.count,
    lastMonth: purchases.lastMonth[index]?.count ?? 0,
  }))

  const mostPurchasedProduct = data?.data.mostPurchasedProduct

  return (
    <PageHolder
      title='Dashboard'
      desc='Welcome to your dashboard! Here you can manage your products, view analytics, and customize your settings all in one place.'
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error?.message} />
      ) : !data?.data ? (
        <EmptyElement
          title="There are no products yet"
          desc="Start by adding a new product to display it in your store"
        />
      ) : (
        <div className='overflow-y-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                Icon={stat.Icon}
                IconClassName='text-background'
                isLoading={isFetching}
                gradientFrom={stat.gradientFrom}
                gradientTo={stat.gradientTo}
              />
            ))}

            <PurchasesDashboardChart purchases={chartData} />
            <ProductDashboardCard product={mostPurchasedProduct} />

            <AdminsManagersTable users={adminAndManagers} />

            <Card className="h-[250px] p-6 col-span-1 md:col-span-2 xl:col-span-1 transition-shadow duration-300 hover:shadow-lg">
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
              </div>
            </Card>
          </div>
        </div>
      )}
    </PageHolder>
  )
}

export default DashboardPage