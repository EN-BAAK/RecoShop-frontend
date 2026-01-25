"use client";

import React from "react";
import { Trash2, Phone, MapPin, Eye } from "lucide-react";
import { useDeleteUser } from "@/hooks/useUser";
import { useAppContext } from "@/contexts/AppProvider";
import { UserProps } from "@/types/components";
import Avatar from "@/components/Avatar";
import { TableRow, TableCell } from "@/components/ui/table";
import CustomButton from "@/components/forms/Button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GenderBadge } from "./GenderBadge";
import { useRouter } from "next/navigation";

const UserRow: React.FC<UserProps> = ({ user }) => {
  const router = useRouter()
  const { showWarning } = useAppContext();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleGoToUserProfile = () => {
    router.push(`/dashboard/users/${user.id}`)
  }

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

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar firstName={user.firstName} width={40} height={40} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {user.firstName} {user.lastName}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {user.email}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="flex-shrink-0 w-4 h-4 text-muted-foreground" />
          <span>{user.phone}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="flex-shrink-0 w-4 h-4 text-muted-foreground" />
          <span>{user.governorate}</span>
        </div>
      </TableCell>

      <TableCell>
        <GenderBadge gender={user.gender} />
      </TableCell>

      <TableCell>
        <Badge className={cn(
          "flex items-center gap-2",
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
      </TableCell>

      <TableCell className="text-right">
        <CustomButton
          variant="blue"
          onClick={handleGoToUserProfile}
          aria-label="View user"
          className="w-fit mx-2 px-2 inline rounded-md"
          iconClassName="w-4 h-4"
          icon={Eye}
        />

        <CustomButton
          variant="danger"
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Delete user"
          className="w-fit mx-2 px-2 inline rounded-md"
          iconClassName="w-4 h-4"
          icon={Trash2}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
