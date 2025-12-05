"use client";

import { Search, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import CustomButton from "@/components/forms/Button";
import { useAppContext } from "@/contexts/AppProvider";
import Link from "next/link";

const Header = () => {
  const { user } = useAppContext()
  const isUserExists: boolean = !!user

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

          <div className="font-heading font-bold text-primary">
            RecoShop
          </div>
        </div>

        <div className="max-w-lg mx-8 hidden md:flex flex-1">
          <div className="w-full relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="bg-background w-full py-5 pr-4 pl-11 rounded-lg transition duration-300"
            />

            <button
              type="submit"
              className="absolute left-3 top-1/2 text-muted-foreground -translate-y-1/2 transition-colors hover:text-primary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Link href={isUserExists ? "/" : "/login"} passHref>
          <CustomButton
            icon={isUserExists ? LogOut : LogIn}
            iconClassName="h-4 w-4"
            variant={isUserExists ? "accent" : "primary"}
            className="w-fit rounded-md text-xs"
            label={isUserExists ? "Logout" : "Login"}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;