import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";

const keywords = [
  ...(mainMetadata.keywords || []),
  "Profile",
  "User Profile",
  "Account Settings",
  "RecoShop",
];

export const metadata: Metadata = {
  title: "Profile | RecoShop",
  description: "Manage your profile information, account settings, and preferences on RecoShop.",
  keywords,
  openGraph: {
    title: "Profile | RecoShop",
    description: "Manage your profile information, account settings, and preferences on RecoShop.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const ProfileLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <main className="h-screen overflow-hidden">
      {children}
    </main>
  );
};

export default ProfileLayout;
