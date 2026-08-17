export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-semibold">Post not found</h2>
      <p className="mt-2 text-muted">
        The post you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
