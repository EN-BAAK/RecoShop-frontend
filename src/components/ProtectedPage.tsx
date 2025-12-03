"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppProvider";
import { ProtectedPageProps } from "@/types/components";

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default ProtectedPage;
