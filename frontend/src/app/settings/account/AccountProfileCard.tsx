"use client";

import InfoModal from "@/components/InfoModal";
import { updateUser, type UserPrivate } from "@/lib/api";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AccountProfileCardProps = {
  user: UserPrivate;
};

export default function AccountProfileCard({ user }: AccountProfileCardProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const isChanged =
    username !== user.username ||
    email.toLowerCase() !== user.email.toLowerCase();

  async function handleUpdateProfile() {
    if (!isChanged) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await updateUser(user.id, {
        username,
        email,
      });

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
        <h2 className="mb-6 text-xl font-bold">Profile Information</h2>

        <div className="flex items-center gap-6">
          <div>
            {/* Avatar */}
            <Image
              src={user.image_path || "/default.jpg"}
              alt={user.username}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          {/* User info */}
          <div>
            <h3 className="text-xl font-semibold">{user.username}</h3>

            <p className="text-muted">{user.email}</p>
          </div>
        </div>

        {/* Update Profile */}
        <div className="mt-8 space-y-5">
          <h2 className="mb-4 font-semibold">Update Profile</h2>
          <div>
            <label htmlFor="username" className="mb-2 block font-medium">
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
            />
          </div>

          {error && <p className="mt-2 text-sm text-danger">{error}</p>}

          <button
            type="button"
            onClick={handleUpdateProfile}
            disabled={isLoading || !isChanged}
            className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Updating..."
              : isChanged
                ? "Update Profile"
                : "No Changes"}
          </button>
        </div>
      </section>

      {successMessage && (
        <InfoModal
          title="Success"
          message={successMessage}
          onConfirm={() => {
            setSuccessMessage(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
