import { LoginForm } from "@/components/auth/login-form";
import { pageTitle } from "@/lib/platform";

export const metadata = {
  title: pageTitle("Sign In"),
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <LoginForm />
    </div>
  );
}
