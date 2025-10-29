import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد",
  description:
    "أنشئ حسابك على RecoShop — منصتك الموثوقة للتسوق داخل القطر السوري. استمتع بتجربة تسوق آمنة وسريعة تشمل الملابس، الأجهزة الطبية، أدوات العناية، الإلكترونيات، والمزيد.",
  keywords: ["RecoShop", "تسجيل حساب", "تجارة إلكترونية", "متجر سوري", "ملابس", "أجهزة طبية", "عناية شخصية", "الكترونيات", "منتجات منزلية", "سوق محلي",],
  openGraph: {
    title: "إنشاء حساب جديد",
    description:
      "انضم إلى RecoShop وابدأ تجربة تسوق مميزة داخل القطر السوري.",
    siteName: "RecoShop",
    locale: "ar_SY",
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
