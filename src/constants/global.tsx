import { AccessItem } from "@/types/global";
import { NavItem, ROLE } from "@/types/variables";
import { LayoutDashboard, Package, ShoppingBag, Users, ShoppingCart, Settings, Layers, Tags } from "lucide-react";

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Categories", href: "/categories", icon: Package },
  { title: "Subcategories", href: "/subcategories", icon: Layers },
  { title: "Brands", href: "/brands", icon: Tags },
  { title: "Products", href: "/products", icon: ShoppingBag },
  { title: "Users", href: "/users", icon: Users },
  { title: "Orders", href: "/orders", icon: ShoppingCart },
  { title: "Settings", href: "/settings", icon: Settings },
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

export const accessGuid: AccessItem[] = [
  { authorized: false, path: "/login", roles: [] },
  { authorized: false, path: "/signup", roles: [] },
  { authorized: false, path: "/verify", roles: [] },
  { authorized: false, path: "/forgot-password", roles: [] },

  {
    authorized: true,
    path: "/dashboard",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    children: [
      { authorized: true, path: "/dashboard/brands", roles: [ROLE.ADMIN, ROLE.MANAGER] },
      { authorized: true, path: "/dashboard/categories", roles: [ROLE.ADMIN, ROLE.MANAGER] },
      { authorized: true, path: "/dashboard/subcategories", roles: [ROLE.ADMIN, ROLE.MANAGER] },
      { authorized: true, path: "/dashboard/products", roles: [ROLE.ADMIN, ROLE.MANAGER] },
      { authorized: true, path: "/dashboard/users", roles: [ROLE.ADMIN] },
    ],
  },
];
