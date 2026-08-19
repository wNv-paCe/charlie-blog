"use client";

type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-1/2 rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="text-center">
          <h2 className="mb-2 text-xl text-danger font-bold">{title}</h2>

          <p className="mb-6 text-card-foreground">{message}</p>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-md border border-border px-5 py-2 font-medium hover:bg-muted"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="cursor-pointer rounded-md bg-danger px-5 py-2 font-medium text-white transition-opacity hover:opacity-90"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
