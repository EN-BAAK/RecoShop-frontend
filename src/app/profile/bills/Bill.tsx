import React from 'react'
import { BillProps } from '@/types/components'

const Bill: React.FC<BillProps> = ({ bill }) => {
  const formattedDate = new Date(bill.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="w-full max-w-md h-full mx-auto overflow-hidden">
      <div className="bg-background flex flex-col border border-muted rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary px-4 py-3 text-background">
          <div className="flex items-center justify-between">
            <h2 className="tracking-tight font-bold text-2xl">Invoice</h2>
            <p className="text-sm text-background mt-1">#{bill.id}</p>
          </div>

          <p className="mt-3 text-right text-sm text-muted">{formattedDate}</p>
        </div>

        <div className="px-4 py-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            <div className="pb-4 grid grid-cols-3 gap-2 border-b-2 border-muted">
              <p className="uppercase tracking-wider font-semibold text-xs text-muted-foreground">Item</p>
              <p className="uppercase tracking-wider font-semibold text-xs text-muted-foreground text-right">Qty</p>
              <p className="uppercase tracking-wider font-semibold text-xs text-muted-foreground text-right">Price</p>
            </div>

            <div className="h-47 space-y-4 mt-3">
              {bill.products.map((product) => (
                <div key={product.id} className="grid grid-cols-3 items-center gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm text-foreground-muted" title={product.title}>
                      {product.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>

                  <p className="font-medium text-sm text-muted-foreground text-right">
                    {product.quantity}×
                  </p>

                  <p className="font-semibold text-sm text-muted-foreground text-right">
                    ${(product.quantity * product.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-2xl text-primary">
              ${bill.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bill