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
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
