import "@/styles/globals.css";

import { type Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";

import { ThemeProvider } from "@/providers/theme-provider";
import { fontVariables } from "@/lib/fonts";
import { platform, pageTitle } from "@/lib/platform";

export const metadata: Metadata = {
  title: pageTitle(),
  description: platform.description,
  icons: [
    { rel: "apple-touch-icon", url: "/cardora-logo.png" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={platform.locale} className={`${geist.variable} ${fontVariables}`} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8347098851451693"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
