"use client";

import React from "react";
import { ShoppingCart, Trash2, } from "lucide-react";
import { useShopContext } from "@/contexts/ShopProvider";
import CustomButton from "@/components/forms/Button";
import { usePurchaseBill } from "@/hooks/useBills";

const Basket: React.FC = () => {
  const { basket, removeFromCart, updateQuantity, cleanCart } = useShopContext();
  const { mutateAsync } = usePurchaseBill()

  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  const onSubmit = async () => {
    const purchaseBill = basket.map(item => ({ productId: item.id, quantity: item.quantity }))
    await mutateAsync({ products: purchaseBill });
    cleanCart();
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="mb-4 py-4 flex items-center gap-2 border-b border-muted">
        <ShoppingCart size={20} className="text-primary" />
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Basket
        </h2>

        {basket.length > 0 && (
          <span className="bg-primary ml-auto px-2 py-1 rounded-full font-bold text-xs text-background">
            {basket.length}
          </span>
        )}
      </div>

      {basket.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Your basket is empty
        </p>) : (
        <div className="flex-1 space-y-3 overflow-y-auto">
          {basket.map((item) => (
            <div key={item.id} className="bg-muted p-2 flex gap-2 rounded-md">
              <div className="flex-1 min-w-0">
                <p className="line-clamp-1 font-medium text-sm text-foreground">
                  {item.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="bg-background w-6 h-6 flex items-center justify-center border border-muted rounded text-xs cursor-pointer transition hover:bg-background/50"
                >
                  −
                </button>

                <span className="w-6 text-center font-medium text-xs">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="bg-background w-6 h-6 flex items-center justify-center border border-muted rounded text-xs cursor-pointer transition hover:bg-background/50"
                >
                  +
                </button>
              </div>

              <CustomButton
                onClick={() => removeFromCart(item.id)}
                icon={Trash2}
                variant="danger-outline"
                className="w-fit py-1 rounded-sm"
                iconClassName="w-3 h-3"
              />
            </div>
          ))}
        </div>
      )}

      <div >
        {basket.length > 0 && (
          <div className="pt-2 flex justify-between border-t border-muted font-semibold text-foreground">
            <span>Total</span>

            <span className="text-lg text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        )}

        <CustomButton
          className="mx-auto w-[200px]"
          label="Buy"
          disabled={basket.length === 0}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default Basket;
