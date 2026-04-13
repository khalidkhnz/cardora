"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, LogOut, ChevronDown, Settings } from "lucide-react";
import { authClient } from "@/server/better-auth/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";

import { APP_NAME } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#FAF8F5] dark:bg-[#0A0A0A]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[264px] shrink-0 flex-col border-r border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414] lg:flex">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-[#E8E4DE] px-6 dark:border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/cardora-logo.png"
              alt="Cardora"
              width={28}
              height={28}
              className="h-7 w-7 object-contain dark:drop-shadow-[0_0_1px_rgba(255,255,255,0.6)]"
            />
            <span
              className="text-lg font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardSidebar />
        </div>
        {/* Sidebar footer */}
        <div className="border-t border-[#E8E4DE] p-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#E8E4DE] dark:border-white/10">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-xs font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{user.name}</p>
              <p className="truncate text-[11px] text-[#6B6560] dark:text-[#A09888]">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E8E4DE] bg-white/80 px-4 backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/80 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[264px] border-r border-[#E8E4DE] bg-white p-0 dark:border-white/10 dark:bg-[#141414]">
                <div className="flex h-16 items-center gap-2 border-b border-[#E8E4DE] px-6 dark:border-white/10">
                  <Image
                    src="/cardora-logo.png"
                    alt="Cardora"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                  <span
                    className="text-lg font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {APP_NAME}
                  </span>
                </div>
                <DashboardSidebar />
              </SheetContent>
            </Sheet>
            {/* Mobile logo */}
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <Image
                src="/cardora-logo.png"
                alt="Cardora"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <span
                className="text-lg font-bold tracking-wide text-[#1A1A1A] dark:text-[#F0E8D8]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {APP_NAME}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 rounded-full px-2 hover:bg-[#F3F0EB] dark:hover:bg-white/10">
                  <Avatar className="h-8 w-8 border border-[#E8E4DE] dark:border-white/10">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-xs font-semibold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-[#1A1A1A] sm:inline-block dark:text-[#F0E8D8]">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6B6560]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-[#E8E4DE] dark:border-white/10">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{user.name}</p>
                  <p className="text-xs text-[#6B6560] dark:text-[#A09888]">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#E8E4DE] dark:bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#E8E4DE] dark:bg-white/10" />
                <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-[#FAF8F5] p-5 dark:bg-[#0A0A0A] lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
