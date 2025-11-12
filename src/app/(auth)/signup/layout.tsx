import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Account",
  description:
    "Create your account on RecoShop — your trusted shopping platform.",
  keywords: ["RecoShop", "Sign Up", "E-commerce", "Shopping", "Store",],
  openGraph: {
    title: "Create a New Account",
    description:
      "Join RecoShop and start a unique shopping experience.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full max-w-md">{children}</div>;
}
