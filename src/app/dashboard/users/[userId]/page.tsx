"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";
import { User as UserIcon, Shield, LucideIcon, Mail, Phone, MapPin, Users, Crown, Trash2 } from "lucide-react";
import { useDeleteUser, useGetUserById } from "@/hooks/useUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE } from "@/types/variables";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import Avatar from "@/components/Avatar";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/contexts/AppProvider";
import CustomButton from "@/components/forms/Button";

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

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { showWarning } = useAppContext();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const userId = Number(params.userId);

  const { data, isFetching, isError, error, refetch } = useGetUserById(userId);
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

  const handleDelete = () => {
    showWarning({
      message: `Are you sure you want to delete the user "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
      btn1: "Cancel",
      btn2: "Yes, Delete",
      handleBtn2: () => {
        deleteUser(user.id);
      },
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <PageHolder title="User Management" desc="View and manage all registered users">
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage
          action={refetch}
          msg={error?.message || "An error occurred while fetching user data"}
        />
      ) : !user ? (
        <EmptyElement
          title="User not found"
          button={{
            action: handleGoBack,
            msg: "Go Back",
          }}
        />
      ) : (
        <div className="w-full mx-auto space-y-6 overflow-y-auto">
          <Card className="border-muted shadow-lg relative">
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

            <Badge className={cn(
              "flex items-center gap-2 absolute bottom-5 right-5",
              user.isVerified ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
            )}>
              {user.isVerified ? (
                <React.Fragment>
                  Verified
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Not Verified
                </React.Fragment>
              )}
            </Badge>

            <CustomButton
              variant="danger"
              onClick={handleDelete}
              disabled={isPending}
              aria-label="Delete user"
              className="w-fit px-2 inline rounded-md absolute top-5 right-5"
              iconClassName="w-4 h-4"
              icon={Trash2}
            />
          </Card>

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
      )}
    </PageHolder>
  );
};

export default UserDetailPage;
