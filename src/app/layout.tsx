import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import CartDrawer from '@/components/cart/CartDrawer';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Kibble",
    default: "Kibble - Premium Pet Supplies",
  },
  description: "Your one-stop shop for high-quality pet food, toys, and accessories.",
  openGraph: {
    title: "Kibble - Premium Pet Supplies",
    description: "Your one-stop shop for high-quality pet food, toys, and accessories.",
    url: "https://kibble.com",
    siteName: "Kibble",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        {children}
        <CartDrawer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
