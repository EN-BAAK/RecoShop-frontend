import { NavItem } from "@/types/variables";
import { LayoutDashboard, Package, ShoppingBag, Users, ShoppingCart, Settings, Layers, } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "الفئات",
    href: "/categories",
    icon: Package,
  },
  {
    title: "الفئات الفرعية",
    href: "/subcategories",
    icon: Layers,
  },
  {
    title: "المنتجات",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "المستخدمين",
    href: "/users",
    icon: Users,
  },
  {
    title: "الطلبات",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings,
  },
];

export const colors: string[] = [
  "bg-indigo-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-teal-600",
  "bg-pink-600",
  "bg-red-600",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-gray-600",
  "bg-cyan-600",
];