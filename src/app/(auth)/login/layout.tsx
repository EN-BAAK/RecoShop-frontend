import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "قم بتسجيل الدخول إلى RecoShop — منصتك الموثوقة للتسوق داخل القطر السوري. استمتع بتجربة تسوق آمنة وسريعة تشمل الملابس، الأجهزة الطبية، أدوات العناية، الإلكترونيات، والمزيد.",
  keywords: ["RecoShop", "تسجيل الدخول", "تجارة إلكترونية", "متجر سوري", "ملابس", "أجهزة طبية", "عناية شخصية", "الكترونيات", "مستحضرات تجميل", "منتجات منزلية", "سوق محلي",],
  openGraph: {
    title: "تسجيل الدخول",
    description: "تسوق من RecoShop، المنصة السورية الأفضل لشراء المنتجات المتنوعة داخل القطر.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      {children}
    </div>
  );
}
