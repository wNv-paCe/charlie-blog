import { requireCurrentUser } from "@/lib/auth-server";
import Sidebar from "@/components/Sidebar";
import AccountProfileCard from "./AccountProfileCard";
import ProfilePictureUpload from "./ProfilePictureUpload";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function AccountSettingsPage() {
  const user = await requireCurrentUser("/settings/account");

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <main className="space-y-4">
          <h1 className="text-foreground text-3xl font-bold">
            Account Settings
          </h1>

          <AccountProfileCard user={user} />
          <ProfilePictureUpload user={user} />
          <ChangePasswordForm />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
