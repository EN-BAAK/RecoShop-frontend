import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"
import { cn } from "@/lib/utils"
import ReactQueryProvider from "@/contexts/ReactQueryProvidder"
import AppProvider from "@/contexts/AppProvider"
import { CommonParentProps } from "@/types/components"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RecoShop",
    template: "%s | RecoShop",
  },
  description:
    "RecoShop is a Syrian online store offering a wide variety of products across the country, including clothing, medical devices, personal care items, household tools, electronics, children's toys, stationery, kitchen supplies, accessories, and local food products.",
  publisher: "Bassel Abu Khabsa",
  keywords: ["RecoShop", "Reco Shop", "Syrian Store", "Shopping", "Clothing", "Medical Devices", "Personal Care Products", "Home Tools", "Electronics", "Kids Toys", "Kitchen Supplies", "Accessories", "Local Food Products",],
  creator: "RecoShop Team",
  category: "Store",
  openGraph: {
    title: "RecoShop - Comprehensive Syrian Online Store",
    description:
      "Shop from RecoShop for all your needs including clothing, medical devices, personal care items, household tools, electronics, kid's toys, and more inside Syria.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
        alt: "RecoShop Preview",
      },
    ],
  },
}

const RootLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <html lang="en" dir="ltr">
      <body
        className={cn(
          inter.variable,
          playfair.variable,
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
