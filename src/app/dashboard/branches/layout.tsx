import React from 'react'
import { CommonParentProps } from '@/types/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Branch Management",
  description:
    "Manage all RecoShop branches easily. Add new branches, update locations, and control branch details in one place.",
  keywords: ["RecoShop", "branch management", "dashboard", "Syrian store", "ecommerce", "branches", "store branches", "manage branches", "branch locations"],
  openGraph: {
    title: "Branch Management - RecoShop",
    description:
      "Easily manage and organize all your RecoShop branches from the dashboard.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
}

const BranchesLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default BranchesLayout
