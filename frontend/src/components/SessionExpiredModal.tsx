"use client";

import { useRouter } from "next/navigation";
import InfoModal from "./InfoModal";

type SessionExpiredModalProps = {
  show: boolean;
};

export default function SessionExpiredModal({
  show,
}: SessionExpiredModalProps) {
  const router = useRouter();

  if (!show) {
    return null;
  }

  return (
    <InfoModal
      title="Session Expired"
      message="Your session has expired. Please log in again."
      onConfirm={() => router.replace("/login")}
    />
  );
}
