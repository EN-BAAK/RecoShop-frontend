"use client"

import React from 'react'
import PageHolder from './DashboardPageHolder'
import AdminsManagersTable from './AdminManagerTable'
import PurchasesDashboardChart from './PurchasesChart'
import ProductDashboardCard from './ProductDashboardCard'
import Appointment from './Appointment'
import Stat from './Stat'

const DashboardPage = () => {
  return (
    <PageHolder
      title='Dashboard'
      desc='Welcome to your dashboard! Here you can manage your products, view analytics, and customize your settings all in one place.'
    >
      <div className='overflow-y-auto'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Stat />
          <PurchasesDashboardChart />
          <ProductDashboardCard />
          <AdminsManagersTable />
          <Appointment />
        </div>
      </div>
    </PageHolder>
  )
}

export default DashboardPage