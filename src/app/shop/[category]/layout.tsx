import React from "react";
import { Basket } from "../Basket";
import { ChatSidebar } from "../ChatSidebar";
import { CommonParentProps } from "@/types/components";

const ShopLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen">
      <div className="px-4 py-6 md:px-6 flex gap-4">
        <aside className="w-64 hidden lg:block flex-shrink-0">
          <ChatSidebar />
        </aside>

        <main className="min-w-0 max-w-4xl flex-1">
          {children}
        </main>

        <aside className="w-80 hidden md:block flex-shrink-0">
          <div className="lg:sticky lg:top-4">
            <Basket />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ShopLayout