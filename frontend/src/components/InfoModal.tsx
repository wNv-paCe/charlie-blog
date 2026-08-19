"use client";

import { CheckCircle } from "lucide-react";

type InfoModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
};

export default function InfoModal({
  title,
  message,
  onConfirm,
}: InfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-1/2 rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="mb-4 text-green-500" size={48} />

          <h2 className="mb-2 text-xl font-bold">{title}</h2>

          <p className="mb-6 text-card-foreground">{message}</p>

          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
