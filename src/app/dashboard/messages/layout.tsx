import React from "react";
import { CommonParentProps } from "@/types/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
  description:
    "Manage all messages sent by users. View inquiries, contact details, and respond efficiently.",
  keywords: ["RecoShop", "messages", "dashboard", "user messages", "contact requests",],
  openGraph: {
    title: "Messages - RecoShop",
    description:
      "View and manage all user messages from the dashboard.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const MessagesLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <React.Fragment>
    {children}
  </React.Fragment>;
};

export default MessagesLayout;
