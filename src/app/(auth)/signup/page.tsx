import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { SignupForm } from "@/components/auth/signup-form";
import { pageTitle } from "@/lib/platform";

export const metadata = {
  title: pageTitle("Sign Up"),
};

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <SignupForm />
    </div>
  );
}
