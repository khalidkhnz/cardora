import { redirect } from "next/navigation";
import { getSession } from "@/server/better-auth/server";
import { LandingContent } from "@/components/landing/landing-content";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return <LandingContent />;
}
