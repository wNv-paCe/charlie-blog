"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>

      <p className="mt-2 text-gray-500">{error.message}</p>

      <button
        type="button"
        onClick={() => {
          console.log("BEFORE RESET");
          reset();
          console.log("AFTER RESET");
        }}
        className="mt-6 cursor-pointer rounded-md border px-4 py-2 transition-colors hover:bg-gray-400 dark:bg-gray-600"
      >
        Try again
      </button>
    </div>
  );
}
