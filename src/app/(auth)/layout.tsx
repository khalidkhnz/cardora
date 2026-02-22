import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
