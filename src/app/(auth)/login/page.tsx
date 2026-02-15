import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In — Cardora",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <LoginForm />
    </div>
  );
}
