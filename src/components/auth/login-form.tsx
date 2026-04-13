"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/server/better-auth/client";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm({ callbackUrl }: { callbackUrl?: string } = {}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Login failed");
        return;
      }

      toast.success("Logged in successfully");
      router.push(callbackUrl ?? "/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white shadow-sm dark:border-white/10 dark:bg-[#141414]">
        {/* Gold accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="px-8 pt-8 pb-2 text-center">
          <Link href="/" className="mx-auto mb-1 inline-block">
            <Image src="/cardora-logo.png" alt="Cardora" width={36} height={36} className="h-9 w-9 object-contain" />
          </Link>
          <h1
            className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#6B6560] dark:text-[#A09888]">
            Sign in to your {platform.name} account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 pt-4 pb-6">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#C8C4BE] dark:text-[#504840]" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-[#E8E4DE] bg-[#FAF8F5] py-2.5 pr-3 pl-10 text-sm text-[#1A1A1A] outline-none transition-all placeholder:text-[#C8C4BE] focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/5 dark:text-[#F0E8D8] dark:placeholder:text-[#504840] dark:focus:border-[#D4AF37]/40"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#8B7355] transition-colors hover:text-[#6B5535] hover:underline dark:text-[#C9A96E] dark:hover:text-[#D4AF37]"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#C8C4BE] dark:text-[#504840]" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-[#E8E4DE] bg-[#FAF8F5] py-2.5 pr-10 pl-10 text-sm text-[#1A1A1A] outline-none transition-all placeholder:text-[#C8C4BE] focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/5 dark:text-[#F0E8D8] dark:placeholder:text-[#504840] dark:focus:border-[#D4AF37]/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#C8C4BE] transition-colors hover:text-[#8B8580] dark:text-[#504840] dark:hover:text-[#A09888]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] py-2.5 text-sm font-medium text-white transition-all hover:from-[#9A7209] hover:to-[#B8960B]"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Divider */}
        <div className="mx-8 h-px bg-[#E8E4DE] dark:bg-white/10" />

        {/* Footer */}
        <div className="px-8 py-5 text-center">
          <p className="text-sm text-[#6B6560] dark:text-[#A09888]">
            Don&apos;t have an account?{" "}
            <Link
              href={callbackUrl ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signup"}
              className="font-medium text-[#8B7355] transition-colors hover:text-[#6B5535] hover:underline dark:text-[#C9A96E] dark:hover:text-[#D4AF37]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
