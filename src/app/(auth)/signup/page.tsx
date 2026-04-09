import { SignupForm } from "@/components/auth/signup-form";
import { pageTitle } from "@/lib/platform";

export const metadata = {
  title: pageTitle("Sign Up"),
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <SignupForm callbackUrl={callbackUrl} />
    </div>
  );
}
