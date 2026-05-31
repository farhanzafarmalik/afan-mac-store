import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavedDrawer from "@/components/SavedDrawer";
import CartInquiryDrawer from "@/components/CartInquiryDrawer";
import ProductQuickDetailsDrawer from "@/components/ProductQuickDetailsDrawer";
import { ShopActionsProvider } from "@/context/ShopActionsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Afan Mac Store",
  description:
    "Pakistan's home for genuine Apple products — MacBook, iPhone, iPad, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="pt-14 md:pt-16">
        <ShopActionsProvider>
          <Navbar />
          {children}
          <SavedDrawer />
          <CartInquiryDrawer />
          <ProductQuickDetailsDrawer />
          <Footer />
        </ShopActionsProvider>
      </body>
    </html>
  );
}
