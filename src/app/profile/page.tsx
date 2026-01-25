"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/hooks/useUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import { Wallet, ShoppingCart, Receipt, Settings, Shield, User as UserIcon, Crown, Mail, Phone, MapPin, Users, LucideIcon, } from "lucide-react";
import { ROLE } from "@/types/variables";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/forms/Button";
import { formatBalance } from "@/lib/helpers";

type RoleConfig = Record<ROLE, {
  label: string,
  icon: LucideIcon
  bg: string,
}>

const roleConfig: RoleConfig = {
  ADMIN: {
    label: "Administrator",
    icon: Shield,
    bg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  MANAGER: {
    label: "Manager",
    icon: Crown,
    bg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CUSTOMER: {
    label: "Customer",
    icon: UserIcon,
    bg: "bg-green-50 text-green-700 border-green-200",
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const { data, isFetching, isError, error, refetch } = useGetUserProfile();
  const user = data?.data;

  const userInfoFields = [
    { icon: UserIcon, label: "First Name", value: user?.firstName },
    { icon: UserIcon, label: "Last Name", value: user?.lastName },
    { icon: Mail, label: "Email", value: user?.email, ltr: true },
    { icon: Phone, label: "Phone", value: user?.phone, ltr: true },
    { icon: MapPin, label: "Governorate", value: user?.governorate },
    { icon: Users, label: "Gender", value: user?.gender },
  ];
  const role = roleConfig[user?.role as ROLE];
  const RoleIcon = role?.icon;

  const onGoToShop = () => {
    router.push("/shop")
  }

  const onGoToSettings = () => {
    router.push("/profile/settings")
  }

  const onGoToBills = () => {
    router.push("/profile/bills")
  }

  if (isFetching) return <LoadingPage />;

  if (isError)
    return (
      <ErrorPage
        msg={error.message}
        action={refetch}
      />
    );
  return (
    <div className="bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-muted shadow-lg">
          <CardContent className="pt-8 pb-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <Avatar firstName={user.firstName} width={85} height={85} />

            <div className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1A1A]">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant="outline"
                  className={`px-3 py-1.5 ${role.bg} flex items-center gap-1.5 border font-semibold text-xs`}
                >
                  <RoleIcon className="w-4 h-4" />
                  {role.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 shadow-lg overflow-hidden">
          <CardContent className="py-8 relative">
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-background/20 w-14 h-14 flex items-center justify-center rounded-full">
                <Wallet className="w-7 h-7 text-background" />
              </div>
              <div className="text-background">
                <p className="font-medium text-sm opacity-90">Wallet Balance</p>

                <p className="font-heading font-bold text-2xl sm:text-3xl">
                  ${formatBalance(user.balance)}
                </p>

                <p className="mt-1 text-xs opacity-80">Available for purchases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CustomButton label="Go to shop" icon={ShoppingCart} iconClassName="w- h-5" onClick={onGoToShop} variant="primary" className="py-4 rounded-sm" />
          <CustomButton label="My Bills" icon={Receipt} iconClassName="w- h-5" onClick={onGoToBills} variant="primary-outline" className="py-4 rounded-sm" />
          <CustomButton label="Settings" icon={Settings} iconClassName="w- h-5" onClick={onGoToSettings} variant="transparent-outline" className="py-4 rounded-sm" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userInfoFields.map((field, i) => (
              <div key={i} className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-sm text-muted-foreground">
                  <field.icon className="w-4 h-4 text-primary" />
                  {field.label}
                </label>

                <div
                  className={cn(
                    "bg-background p-3 border border-muted rounded-lg font-medium",
                    field.ltr && "text-left"
                  )}
                >
                  {field.value}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
