import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  hasMore: boolean;
  basePath: string;
};

export default function Pagination({
  currentPage,
  hasMore,
  basePath,
}: PaginationProps) {
  const hasPrevious = currentPage > 1;

  if (!hasPrevious && !hasMore) {
    return null;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-4">
      {hasPrevious ? (
        <Link
          href={
            currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`
          }
          className="rounded-md px-4 py-2 font-medium transition-opacity hover:opacity-80"
        >
          Previous
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-md px-4 py-2 font-medium opacity-50">
          Previous
        </span>
      )}

      <span className="text-sm text-muted">Page {currentPage}</span>

      {hasMore ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-md px-4 py-2 font-medium transition-opacity hover:opacity-80"
        >
          Next
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-md px-4 py-2 font-medium opacity-50">
          Next
        </span>
      )}
    </nav>
  );
}
