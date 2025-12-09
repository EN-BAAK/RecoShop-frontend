"use client"

import { ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"

interface BasketItem {
  id: number
  title: string
  price: number
  quantity: number
}

export function Basket() {
  const [items, setItems] = useState<BasketItem[]>([])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  return (
    <div className="bg-white border border-muted rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-muted">
        <ShoppingCart size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Basket
        </h2>
        {items.length > 0 && (
          <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            {items.length}
          </span>
        )}
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            Your basket is empty
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-2 p-2 bg-muted rounded-md">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center bg-white border border-muted rounded text-xs hover:bg-muted"
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-white border border-muted rounded text-xs hover:bg-muted"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-danger hover:bg-red-50 p-1 rounded transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-muted">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-muted">
            <span>Total</span>
            <span className="text-primary text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button
        disabled={items.length === 0}
        className="w-full mt-4 bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Checkout
      </button>
    </div>
  )
}