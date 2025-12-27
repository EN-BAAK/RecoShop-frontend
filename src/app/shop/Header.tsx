"use client";

import { Search, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import CustomButton from "@/components/forms/Button";
import { useAppContext } from "@/contexts/AppProvider";
import Link from "next/link";
import { useDebouncedSearch } from "@/hooks/useHelpers";
import { useEffect } from "react";
import { useShopContext } from "@/contexts/ShopProvider";
import Avatar from "@/components/Avatar";

const Header = () => {
  const { user } = useAppContext()
  const { setSearch: setShopSearch } = useShopContext()

  const { debouncedSearch, search, setSearch } = useDebouncedSearch()


  useEffect(() => {
    setShopSearch(debouncedSearch)
  }, [debouncedSearch, setShopSearch])

  return (
    <header className="bg-background/95 w-full border-b border-muted sticky shadow-md backdrop-blur-sm top-0 z-50">
      <div className="h-16 w-full mx-auto px-4 sm:px-6 lg:px-8 container flex justify-between items-center">
        <div className="flex items-center">
          <Image
            width={45}
            height={45}
            alt="logo"
            src="/logo.png"
            loading="lazy"
          />

          <h1 className="font-heading font-bold text-primary">
            RecoShop
          </h1>
        </div>

        <div className="max-w-lg mx-8 hidden md:flex flex-1">
          <div className="w-full relative">
            <Input
              type="text"
              value={search}
              placeholder="Search products..."
              className="bg-background w-full py-5 pr-4 pl-11 rounded-lg transition duration-300"
              onChange={(e) => setSearch(e.target.value)}
            />

            <CustomButton className="w-fit p-0 absolute left-3 top-1/2 -translate-y-1/2" variant="transparent" icon={Search} iconClassName="w-5 h-5" aria-label="Search" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {user &&
            <div className="flex items-center gap-1">
              <Avatar firstName={user.firstName} width={30} height={30} />
              <span className="text-sm">{user.firstName}</span>
            </div>

          }

          <Link href={user ? "/" : "/login"} passHref>
            <CustomButton
              icon={user ? LogOut : LogIn}
              iconClassName="h-4 w-4"
              variant={user ? "transparent" : "primary"}
              className="w-fit rounded-md text-xs"
              label={user ? undefined : "Login"}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;