import { LoginForm } from "@/components/auth/login-form";
import { pageTitle } from "@/lib/platform";

export const metadata = {
  title: pageTitle("Sign In"),
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-4 dark:bg-[#0A0A0A]">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
