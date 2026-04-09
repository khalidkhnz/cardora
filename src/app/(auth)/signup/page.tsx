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
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4 py-8 dark:bg-[#0A0A0A]">
      <SignupForm callbackUrl={callbackUrl} />
    </div>
  );
}
