"use client";

import { useRouter } from "next/navigation";
import InfoModal from "./InfoModal";
import { AlertTriangle } from "lucide-react";

type SessionExpiredModalProps = {
  show: boolean;
  next?: string;
};

export default function SessionExpiredModal({
  show,
  next,
}: SessionExpiredModalProps) {
  const router = useRouter();

  if (!show) {
    return null;
  }

  function handleConfirm() {
    const loginUrl = next
      ? `/login?next=${encodeURIComponent(next)}`
      : "/login";
    router.replace(loginUrl);
  }

  return (
    <InfoModal
      title="Session Expired"
      message="Your session has expired. Please log in again."
      icon={AlertTriangle}
      onConfirm={handleConfirm}
    />
  );
}
