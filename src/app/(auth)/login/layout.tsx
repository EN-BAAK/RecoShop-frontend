import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to RecoShop — your trusted Syrian e-commerce platform. Enjoy a safe and fast shopping experience for clothing, medical devices, personal care products, electronics, and more.",
  keywords: ["RecoShop", "login", "e-commerce", "Syrian store", "shopping", "fashion", "medical devices", "personal care", "electronics", "local market",],
  openGraph: {
    title: "Login",
    description:
      "Sign in to RecoShop, the best Syrian online store for all your daily needs.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full max-w-md">{children}</div>;
}
