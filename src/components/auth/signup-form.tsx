"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/server/better-auth/client";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";
import { User, AtSign, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function SignupForm({ callbackUrl }: { callbackUrl?: string } = {}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        toast.error(result.error.message ?? "Signup failed");
        return;
      }

      try {
        await apiClient("/api/user/profile", {
          method: "PUT",
          body: JSON.stringify({ username }),
        });
      } catch {
        // Profile creation might fail if user already has one
      }

      toast.success("Account created successfully");
      router.push(callbackUrl ?? "/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#E8E4DE] bg-[#FAF8F5] py-2.5 pr-3 pl-10 text-sm text-[#1A1A1A] outline-none transition-all placeholder:text-[#C8C4BE] focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/10 dark:border-white/10 dark:bg-white/5 dark:text-[#F0E8D8] dark:placeholder:text-[#504840] dark:focus:border-[#D4AF37]/40";

  const labelClass = "text-xs font-medium uppercase tracking-wider text-[#8B8580] dark:text-[#706860]";

  const iconClass = "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#C8C4BE] dark:text-[#504840]";

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
            Create an account
          </h1>
          <p className="mt-1.5 text-sm text-[#6B6560] dark:text-[#A09888]">
            Get started with your digital business card
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 pt-4 pb-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <div className="relative">
              <User className={iconClass} />
              <input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className={labelClass}>Username</label>
            <div className="relative">
              <AtSign className={iconClass} />
              <input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                pattern="^[a-zA-Z0-9_-]+$"
                minLength={3}
                maxLength={30}
                className={inputClass}
              />
            </div>
            <p className="pl-1 text-[11px] text-[#8B8580] dark:text-[#706860]">
              {platform.domain}/u/{username || "username"}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className={labelClass}>Email</label>
            <div className="relative">
              <Mail className={iconClass} />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className={labelClass}>Password</label>
            <div className="relative">
              <Lock className={iconClass} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className={`${inputClass} !pr-10`}
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
            <div className="relative">
              <Lock className={iconClass} />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] py-2.5 text-sm font-medium text-white transition-all hover:from-[#9A7209] hover:to-[#B8960B]"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="mx-8 h-px bg-[#E8E4DE] dark:bg-white/10" />

        {/* Footer */}
        <div className="px-8 py-5 text-center">
          <p className="text-sm text-[#6B6560] dark:text-[#A09888]">
            Already have an account?{" "}
            <Link
              href={callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login"}
              className="font-medium text-[#8B7355] transition-colors hover:text-[#6B5535] hover:underline dark:text-[#C9A96E] dark:hover:text-[#D4AF37]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
