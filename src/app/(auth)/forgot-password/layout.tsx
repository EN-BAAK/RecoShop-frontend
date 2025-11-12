import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your password to regain access to your RecoShop account. Quick, secure, and easy.",
  keywords: ["RecoShop", "Forgot password", "Password reset", "E-commerce", "Syria store", "Account recovery",],
  openGraph: {
    title: "Forgot Password",
    description: "Reset your RecoShop account password easily and securely.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full max-w-md">{children}</div>;
}
