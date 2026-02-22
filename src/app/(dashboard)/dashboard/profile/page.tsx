import { ProfileForm } from "@/components/profile/profile-form";
import { pageTitle } from "@/lib/platform";

export const metadata = {
  title: pageTitle("Profile"),
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
