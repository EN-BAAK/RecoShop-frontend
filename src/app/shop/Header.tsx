// components/Header.tsx
"use client";

import { Search, LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="bg-background/95 w-full border-b border-muted sticky shadow-md backdrop-blur-sm top-0 z-50">
      <div className="h-16 w-full mx-auto px-4 sm:px-6 lg:px-8 container flex justify-between items-center">
        <div className="space-x-4 flex items-center">
          <div className="tracking-wider text-left font-heading font-bold text-xl text-primary cursor-pointer">
            SHOP LOGO
          </div>
        </div>

        <div className="max-w-lg mx-8 hidden md:flex flex-1">
          <div className="w-full relative">
            <Search className="h-4 w-4 text-foreground/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search products..."
              className="h-10 w-full pl-10"
            />
          </div>
        </div>

        <div className="space-x-2 flex items-center">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <Button className="bg-primary3 font-sans text-background transition-colors hover:bg-primary/90">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>

          {/* Mobile Menu (Optional for further navigation) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mt-4 flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative w-full md:hidden">
                  <Search className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-foreground/60" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-10 w-full pl-10"
                  />
                </div>
                <div className="border-t pt-4">
                  <p className="text-left font-sans text-sm text-muted-foreground">
                    Mobile Nav Links Go Here
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
