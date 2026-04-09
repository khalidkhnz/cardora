"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  BarChart3,
  User,
  Sparkles,
  Mail,
  Image,
  Wallet,
  Nfc,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const iconMap = {
  Home,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  BarChart3,
  User,
  Sparkles,
  Mail,
  Image,
  Wallet,
  Nfc,
} as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 text-[#8B6914] dark:from-[#D4AF37]/20 dark:to-[#D4AF37]/5 dark:text-[#D4AF37]"
                : "text-[#6B6560] hover:bg-[#F3F0EB] hover:text-[#1A1A1A] dark:text-[#A09888] dark:hover:bg-white/5 dark:hover:text-[#F0E8D8]",
            )}
          >
            <Icon
              className={cn(
                "h-[18px] w-[18px] transition-colors",
                isActive
                  ? "text-[#D4AF37]"
                  : "text-[#8B8580] group-hover:text-[#6B6560] dark:text-[#706860] dark:group-hover:text-[#A09888]",
              )}
            />
            {item.label}
            {isActive && (
              <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
