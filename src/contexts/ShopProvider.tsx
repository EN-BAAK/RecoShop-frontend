"use client";

import React, { createContext, useContext, useState } from "react";
import { CommonParentProps } from "@/types/components";
import { BasketItem } from "@/types/global";
import { ShopContextProps } from "@/types/context";
import { useAppContext } from "./AppProvider";

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

const ShopProvider = ({ children }: CommonParentProps): React.JSX.Element => {
  const { pushToast } = useAppContext()
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const pushToCart = ({ id, quantity = 1, title, price }: { id: number, quantity?: number, title: string, price: number }) => {
    const existing = basket.find(item => item.id === id);
    if (!existing) {
      pushToast({ message: `${title} added to cart!`, type: "SUCCESS" })
    }

    setBasket(prev => {
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
      }

      return [...prev, { id, quantity, price, title }];
    });
  };

  const removeFromCart = (id: number) => {
    setBasket(prev => prev.filter(item => item.id !== id));
  };

  const cleanCart = () => {
    setBasket([]);
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setBasket(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  return (
    <ShopContext.Provider value={{ basket, pushToCart, removeFromCart, updateQuantity, cleanCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShopContext must be used within ShopProvider");
  return context;
};

export default ShopProvider