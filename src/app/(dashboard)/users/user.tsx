"use client";

import { Trash2, Mail, Phone, MapPin, User as UserIcon } from "lucide-react";
import { useDeleteUser } from "@/hooks/useUser";
import { useAppContext } from "@/contexts/AppProvider";
import { Button } from "@/components/ui/button";
import { UserProps } from "@/types/components";
import { ROLE, SEX } from "@/types/variables";
import Avatar from "@/components/Avatar";
import CustomButton from "@/components/forms/Button";

const UserCard: React.FC<UserProps> = ({ user }) => {
  const { showWarning } = useAppContext();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = () => {
    showWarning({
      message: `هل أنت متأكد من حذف المستخدم "${user.firstName} ${user.lastName}"؟ لا يمكن التراجع عن هذا الإجراء.`,
      btn1: "إلغاء",
      btn2: "نعم، احذف",
      handleBtn2: () => {
        deleteUser(user.id);
      },
    });
  };

  const getGenderLabel = (gender: SEX) => {
    return gender === SEX.MALE ? "ذكر" : "أنثى";
  };

  const getRoleLabel = (role: ROLE) => {
    const roleLabels: Record<string, string> = {
      ADMIN: "مدير",
      Client: "مستخدم",
    };
    return roleLabels[role] || role;
  };

  return (
    <div className="bg-white p-6 border border-muted rounded-xl shadow-sm font-sans relative transition-shadow duration-200 hover:shadow-md group">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar firstName={user.firstName} width={50} height={50} />

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {user.firstName} {user.lastName}
            </h3>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate" dir="ltr">
            {user.email}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground" dir="ltr">
            {user.phone}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">
            {user.governorate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">
            {getGenderLabel(user.gender)}
          </span>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-2 border-t border-muted">
        <CustomButton
          icon={Trash2}
          label={isPending ? "جاري الحذف..." : "حذف"}
          onClick={handleDelete}
          disabled={isPending}
          variant="danger-outline"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default UserCard;