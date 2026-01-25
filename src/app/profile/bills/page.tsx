'use client'

import { useGetUserBills } from '@/hooks/useBills'
import React, { useState } from 'react'
import Bill from './Bill'
import DatePickerButton from './DatePickerButton'
import { Bill as BillType } from '@/types/global'
import CustomButton from '@/components/forms/Button'
import LoadingPage from '@/components/LoadingPage'
import ErrorPage from '@/components/ErrorPage'
import EmptyElement from '@/components/EmptyElement'
import { useRouter } from 'next/navigation'

const BillsPage: React.FC = () => {
  const router = useRouter()
  const [startDate, setStartDate] = useState<string | undefined>()
  const [endDate, setEndDate] = useState<string | undefined>()

  const { data, isFetching, error, isError, refetch } = useGetUserBills({ startDate, endDate })

  const transactions: BillType[] = data?.data || []

  const navigateToShop = () => {
    router.replace('/shop')
  }

  if (isFetching) return <LoadingPage className='h-[80vh] w-full' />
  if (isError) return <ErrorPage msg={"error.message"} className='h-[80vh] w-full' action={refetch} />
  if (!transactions.length)
    return (
      <EmptyElement
        title="No Bills Yet"
        className='h-[80vh] w-full'
        desc="You haven’t made any purchases yet. Start shopping to see your bills appear here."
        button={{
          action: navigateToShop,
          msg: 'Go to Shop'
        }}
      />
    )

  return (
    <div className="bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex sm:flex-row flex-col items-center justify-between">
          <div className="mb-2">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary">
              Bills
            </h1>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <DatePickerButton date={startDate} onDateChange={setStartDate} placeholder="Start Date" />
            <DatePickerButton date={endDate} onDateChange={setEndDate} placeholder="End Date" />

            {(startDate || endDate) && (
              <CustomButton
                onClick={() => {
                  setStartDate(undefined)
                  setEndDate(undefined)
                }}
                label='Clear Filters'
                className='w-full sm:w-fit'
              />
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transactions.map((bill) => (
            <Bill key={bill.id} bill={bill} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BillsPage