"use client";

import { useEffect } from "react";
import { Search, LogOut } from "lucide-react";
import { useAppContext } from "@/contexts/AppProvider";
import { useLogout } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import CustomButton from "@/components/forms/Button";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
import Notifications from "./Notifications";

const Header: React.FC = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return <LoadingPage />;

  return (
    <header className="bg-background border-b border-muted shadow-sm">
      <div className="py-4 px-4 lg:px-8 flex items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl" role="search">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products, categories, orders..."
              className="bg-background w-full py-5 pr-4 pl-11 rounded-lg transition duration-300"
              aria-label="Search in dashboard"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 text-muted-foreground -translate-y-1/2 transition-colors hover:text-primary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Notifications notifications={[]} />

          <div className="w-px h-8 bg-muted" />

          <div className="py-2 px-3 flex items-center gap-3 rounded-lg transition-colors hover:bg-background">
            <Avatar firstName={user.firstName} />
            <div className="hidden sm:block">
              <p className="leading-tight font-sans font-semibold text-sm text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="lowercase font-sans text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>

          <CustomButton
            variant="transparent"
            className="w-fit h-fit p-2 rounded-sm"
            iconClassName="w-5 h-5"
            icon={LogOut}
            onClick={logout}
            disabled={isLoggingOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
