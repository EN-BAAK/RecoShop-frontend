"use client";

import { useParams, useRouter } from "next/navigation";
import { Mail, Phone, MapPin, User as UserIcon, Shield, Users } from "lucide-react";
import { useGetUserById } from "@/hooks/useUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE, SEX } from "@/types/variables";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import Avatar from "@/components/Avatar";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.userId);

  const { data, isFetching, isError, error, refetch } = useGetUserById(userId);
  const user = data?.data;

  const getGenderLabel = (gender: SEX) => (gender === SEX.MALE ? "Male" : "Female");

  const getRoleLabel = (role: ROLE) => {
    const roleLabels: Record<string, string> = {
      ADMIN: "Admin",
      Client: "User",
    };
    return roleLabels[role] || role;
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
        <div className="overflow-y-auto">
          <Card className="border border-muted rounded-xl shadow-md">
            <CardHeader className="bg-background/50 p-6 border-b border-muted">
              <div className="flex items-center gap-4">
                <Avatar firstName={user.firstName} height={85} width={85} />
                <div>
                  <CardTitle className="text-2xl font-sans">
                    {user.firstName} {user.lastName}
                  </CardTitle>

                  <CardDescription className="mt-1 flex items-center gap-2 font-sans">
                    <span className="bg-primary/10 text-primary flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      {getRoleLabel(user.role)}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "First Name", value: user.firstName, icon: UserIcon },
                  { label: "Last Name", value: user.lastName, icon: UserIcon },
                  { label: "Email", value: user.email, icon: Mail, ltr: true },
                  { label: "Phone", value: user.phone, icon: Phone, ltr: true },
                  { label: "Governorate", value: user.governorate, icon: MapPin },
                  { label: "Gender", value: getGenderLabel(user.gender), icon: Users },
                ].map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground font-sans">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </label>
                    <div className="bg-background p-3 border border-muted rounded-lg">
                      <p
                        className="text-foreground font-sans font-medium"
                        dir={field.ltr ? "ltr" : "rtl"}
                        style={field.ltr ? { textAlign: "left" } : {}}
                      >
                        {field.value}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground font-sans">
                    <Shield className="w-4 h-4" />
                    Role
                  </label>
                  <div className="bg-primary/5 p-3 border border-primary/20 rounded-lg">
                    <p className="text-primary font-sans font-semibold">
                      {getRoleLabel(user.role)}
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageHolder>
  );
};

export default UserDetailPage;
