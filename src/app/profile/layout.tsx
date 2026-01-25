import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Header from "./Header";

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
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default ProfileLayout;
