"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { landingSections } from "@/constants/global";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      landingSections.forEach((section) => {
        const el = document.getElementById(section.href.replace("#", ""));
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(section.href.replace("#", ""));
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="bg-background w-full shadow-sm fixed top-0 left-0 z-50 transition-transform duration-300" >
      <div className="container h-[72px] mx-auto px-6 flex items-center justify-between">
        <div className="tracking-wide font-heading font-bold text-xl text-primary">
          RecoShop
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {landingSections.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "font-semibold text-sm transition relative",
                active === link.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}

              {active === link.href.replace("#", "") && (
                <span className="bg-primary rounded-full w-full h-[2px] absolute -bottom-2 left-0" />
              )}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="p-2 lg:hidden rounded-md cursor-pointer hover:bg-muted"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={cn(
          "bg-foreground/40 fixed inset-0 z-40 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "bg-background h-full w-64 shadow-xl fixed top-0 right-0 z-50 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-[72px] px-5 flex items-center justify-between border-b">
          <span className="font-heading font-bold text-lg text-primary">
            RecoShop
          </span>

          <button className="cursor-pointer" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-5">
          {landingSections.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "font-semibold text-sm transition",
                active === link.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
};

export default Header;
