import type { Metadata } from "next"
import { Tajawal, Amiri_Quran, Reem_Kufi } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import ReactQueryProvider from "@/contexts/ReactQueryProvidder"
import AppProvider from "@/contexts/AppProvider"
import { CommonParentProps } from "@/types/components"

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  display: "swap",
})

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
  display: "swap",
})

const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  variable: "--font-quran",
  weight: ["400"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ريكوشوب",
    template: "%s | ريكوشوب",
  },
  description:
    "ريكوشوب هو متجر إلكتروني سوري شامل يوفّر منتجات متنوعة داخل القطر مثل الملابس، الأجهزة الطبية، مستلزمات العناية الشخصية، الأدوات المنزلية، الإلكترونيات، ألعاب الأطفال، الأدوات المكتبية، مستلزمات المطبخ، الإكسسوارات، والمنتجات الغذائية المحلية.",
  publisher: "باسل ابو خبصة",
  keywords: ["ريكوشوب", "ريكو شوب", "متجر سوري", "تسوق", "ملابس", "أجهزة طبية", "منتجات عناية", "أدوات منزلية", "الكترونيات", "ألعاب أطفال", "مستلزمات مطبخ", "إكسسوارات", "منتجات غذائية",],
  creator: "فريق ريكوشوب",
  category: "متجر",
  openGraph: {
    title: "ريكوشوب - متجر إلكتروني سوري شامل",
    description:
      "تسوّق من ريكوشوب جميع احتياجاتك من الملابس، الأجهزة الطبية، أدوات العناية الشخصية، الأدوات المنزلية، الإلكترونيات، ألعاب الأطفال، والمزيد داخل القطر السوري.",
    siteName: "ٌRecoShop",
    locale: "ar_SY",
    type: "website",
    // يمكنك لاحقًا إضافة صورة المشاركة هنا:
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "RecoShop Preview",
    //   },
    // ],
  },
}

const RootLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={cn(
          tajawal.variable,
          reemKufi.variable,
          amiriQuran.variable,
          "antialiased bg-background text-foreground"
        )}
      >
        <ReactQueryProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
