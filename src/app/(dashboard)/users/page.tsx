"use client";

import { useRouter } from "next/navigation";
import { useGetAllUsers } from "@/hooks/useUser";
import { User } from "@/types/global";
import UserCard from "./user";
import PageHolder from "@/app/PageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { GOVERNORATE, ROLE, SEX } from "@/types/variables";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const {
    data,
    isLoading: isFetching,
    isError,
    error,
    refetch,
  } = useGetAllUsers();

  const users = data?.data || []

  const handleAddNewUser = () => {
    router.push("/users/add");
  };

  return (
    <PageHolder title="إدارة المستخدمين" desc="عرض وإدارة جميع المستخدمين المسجلين في النظام">
      {isFetching
        ? <LoadingPage />
        : isError ?
          <ErrorPage
            action={refetch}
            msg={error?.message || "حدث خطأ أثناء تحميل المستخدمين"}
          />
          : users.length === 0 ?
            <EmptyElement
              title="لا يوجد مستخدمين حالياً"
              desc="ابدأ بإضافة مستخدم جديد للنظام"
              button={{
                action: handleAddNewUser,
                msg: "إضافة مستخدم جديد",
              }}
            />
            : (
              <div className="overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {users.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}
    </PageHolder>
  );
};

export default UsersPage;