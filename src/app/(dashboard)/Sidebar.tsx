"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X, LogOut, ChevronLeft } from "lucide-react";
import { navItems } from "@/constants/global";
import Avatar from "@/components/Avatar";
import { useAppContext } from "@/contexts/AppProvider";
import LoadingPage from "@/components/LoadingPage";
import CustomButton from "@/components/forms/Button";
import { ROLE } from "@/types/variables";
import { useLogout } from "@/hooks/useAuth";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const { user } = useAppContext();
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const roleText =
    user?.role === ROLE.ADMIN ? "Admin" : "Shopper";

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return <LoadingPage />;

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
          "bg-background h-screen w-70 border-l border-muted shadow-xl fixed lg:static top-0 left-0 z-50",
          "flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "-translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="border-b border-muted p-6">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary to-primary/80 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <ShoppingBag className="w-7 h-7 text-background" />
            </div>

            <div>
              <h1 className="font-heading text-2xl font-bold text-primary">
                RecoShop
              </h1>
              <p className="font-sans text-xs text-muted-foreground">
                Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-2 py-6 px-4 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "bg-none px-4 py-3 rounded-lg flex items-center gap-3 font-sans font-medium transition-all duration-200",
                  "hover:bg-primary/5 hover:translate-x-1",
                  isActive
                    ? "bg-primary text-background shadow-md hover:bg-primary"
                    : "text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-background" : "text-muted-foreground"
                  )}
                />
                <span className="flex-1">{item.title}</span>
                {isActive && (
                  <ChevronLeft className="w-4 h-4 text-background" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 flex items-center border-t border-muted">
          <div className="bg-background w-full p-3 rounded-lg flex items-center gap-3">
            <Avatar firstName={user?.firstName} width={40} height={40} />

            <div className="min-w-0 flex-1">
              <p className="truncate font-sans font-semibold text-sm text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="font-sans text-xs text-muted-foreground">{roleText}</p>
            </div>
          </div>

          <CustomButton
            variant="transparent"
            className="w-fit h-fit p-2"
            iconClassName="w-5 h-5"
            icon={LogOut}
            onClick={logout}
            disabled={isLoggingOut}
          />
        </div>

        <button
          onClick={toggleSidebar}
          className="bg-background p-2 block lg:hidden rounded-r-lg shadow-md absolute top-20 left-70 z-51 cursor-pointer transition-shadow hover:shadow-lg"
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
};

export default Sidebar;
