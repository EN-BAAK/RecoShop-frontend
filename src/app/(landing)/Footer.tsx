"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowRight, } from "lucide-react";
import { useGetAllCategories } from "@/hooks/useCategory";
import { landingSections } from "@/constants/global";
import { Category } from "@/types/global";

const Footer: React.FC = () => {
  const { data } = useGetAllCategories();
  const categories: Category[] = data?.data || [];

  const contactList = [
    {
      id: 1,
      icon: MapPin,
      value: "Damascus, Syria",
      color: "text-rose-300",
    },
    {
      id: 2,
      icon: Phone,
      value: "+963 933 000 111",
      color: "text-emerald-300",
    },
    {
      id: 3,
      icon: Mail,
      value: "info@recoshop.com",
      color: "text-sky-300",
    },
  ];

  return (
    <footer className="bg-primary mt-20 border-t border-primary text-background">
      <div className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="mb-4 font-sans font-semibold text-lg">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {landingSections.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-background/80 transition hover:text-background"
                  >
                    <ArrowRight className="w-4 h-4 text-background" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">
              Categories
            </h3>

            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={{
                      pathname: '/shop/products',
                      query: { category: cat.title }
                    }}
                    className="flex items-center gap-2 text-sm text-background/80 transition hover:text-background"
                  >
                    <ArrowRight className="w-4 h-4 text-background" />
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans font-semibold text-lg">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              {contactList.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 text-background/80"
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.value}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-blue-300 transition hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="text-pink-300 transition hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-background w-[200px] h-[200px] flex items-center justify-center rounded-full">
              <Image
                src="/logo.png"
                alt="RecoShop Logo"
                width={180}
                height={180}
              />
            </div>

            <p className="max-w-xs text-center text-sm text-background/70">
              RecoShop is your trusted destination for high-quality products
              and professional service.
            </p>
          </div>
        </div>

        <div className="mt-12 py-4 border-t border-background/20 text-center text-sm text-background/70">
          © {new Date().getFullYear()} RecoShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
