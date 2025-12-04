"use client";

import { useRouter } from "next/navigation";
import { useGetAllUsers } from "@/hooks/useUser";
import { UserGlobal } from "@/types/global";
import UserRow from "./user";
import { Table, TableHeader, TableBody, TableHead, TableRow as TR } from "@/components/ui/table";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const { data, isLoading: isFetching, isError, error, refetch } = useGetAllUsers();

  const users = (data?.data || []) as UserGlobal[];

  const handleAddNewUser = () => {
    router.push("users/add");
  };

  return (
    <PageHolder
      title="User Management"
      desc="View and manage all registered users in the system"
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage
          action={refetch}
          msg={error?.message || "An error occurred while fetching users"}
        />
      ) : users.length === 0 ? (
        <EmptyElement
          title="No users found"
          desc="Start by adding a new user to the system"
          button={{
            action: handleAddNewUser,
            msg: "Add New User",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <Table>
            <TableHeader>
              <TR>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Governorate</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TR>
            </TableHeader>
            <TableBody>
              {users.map((user: UserGlobal) => (
                <UserRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageHolder>
  );
};

export default UsersPage;
