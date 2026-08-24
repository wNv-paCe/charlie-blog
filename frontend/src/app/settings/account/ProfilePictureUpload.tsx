"use client";

import InfoModal from "@/components/InfoModal";
import { uploadProfilePicture } from "@/lib/api/users";
import { UserPrivate } from "@/lib/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProfilePictureUploadProps = {
  user: UserPrivate;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default function ProfilePictureUpload({
  user,
}: ProfilePictureUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a JPEG, PNG, GIF or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File too large. Maximum file size is 5MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedFile) {
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      await uploadProfilePicture(user.id, selectedFile);

      setSuccessMessage("Profile picture uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
        <h2 className="mb-6 text-xl font-bold">Profile Picture</h2>

        <div className="gap-6">
          {/* Image Preview */}
          {previewUrl && (
            <div className="flex justify-center mt-8 mb-6 shrink-0">
              <Image
                src={previewUrl}
                alt="Profile picture preview"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
          )}

          {/* Upload Picture */}
          <div className="min-w-0">
            <div className="flex w-full max-w-full overflow-hidden rounded-md border border-border">
              <label
                htmlFor="profile-picture"
                className="flex cursor-pointer items-center bg-muted px-2 py-1 font-medium text-black transition-opacity hover:opacity-90"
              >
                Choose File
              </label>

              <input
                id="profile-picture"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="min-w-0 flex-1 px-3 py-2 text-sm">
                {selectedFile ? (
                  <span className="block truncate">{selectedFile.name}</span>
                ) : (
                  <span className="text-muted">No file selected</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="cursor-pointer rounded-md bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <p className="mt-2 text-xs text-muted">
              Maximum file size: 5MB. Supported formats: JPEG, PNG, GIF, WebP
            </p>

            {error && <p className="mt-2 text-sm text-danger">{error}</p>}
          </div>
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
