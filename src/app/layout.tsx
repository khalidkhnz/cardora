import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "@/providers/cart-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { fontVariables } from "@/lib/fonts";
import { platform, pageTitle } from "@/lib/platform";

export const metadata: Metadata = {
  title: pageTitle(),
  description: platform.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
      <body>
        <ThemeProvider>
          <QueryProvider>
            <CartProvider>
              {children}
            </CartProvider>
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
