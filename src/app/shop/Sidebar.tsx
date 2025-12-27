'use client';

import React, { useState } from 'react';
import { Menu, MessageCircle, ShoppingCart, X } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';
import Basket from './Basket';
import { cn } from '@/lib/utils';

type TabType = 'chat' | 'basket';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <React.Fragment>

      {isOpen && (
        <div
          className="bg-foreground/50 block lg:hidden fixed inset-0 z-50 animate-in fade-in duration-200"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "bg-background h-screen w-70 py-3 px-1 border-l border-muted fixed lg:static right-0 top-0 z-50 lg:relative lg:top-auto lg:translate-x-0 transition-transform duration-300 ease-in-out",
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="border-b border-muted">
          <div className="pb-3 flex gap-2">
            <button
              onClick={() => handleTabChange('chat')}
              className={cn(
                "py-2 px-3 rounded-md font-medium text-sm transition-colors cursor-pointer",
                activeTab === 'chat' ? 'bg-blue-600 text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleTabChange('basket')}
              className={cn(
                "py-2 px-3 rounded-md font-medium text-sm transition-colors cursor-pointer",
                activeTab === 'basket' ? 'bg-orange-600 text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-full pb-12 overflow-hidden">
          {activeTab === 'chat' ? <ChatSidebar /> : <Basket />}
        </div>

        <button
          onClick={toggleSidebar}
          className="bg-background p-2 block lg:hidden rounded-l-lg shadow-md absolute top-20 right-70 z-51 cursor-pointer transition-shadow hover:shadow-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </aside>
    </React.Fragment>
  );
}

export default Sidebar