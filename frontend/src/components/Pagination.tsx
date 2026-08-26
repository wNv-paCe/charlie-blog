import Link from "next/link";

type PaginationPros = {
  currentPage: number;
  hasMore: boolean;
};

export default function Pagination({ currentPage, hasMore }: PaginationPros) {
  const hasPrevious = currentPage > 1;

  //   if (!hasPrevious && !hasMore) {
  //     return null;
  //   }

  return (
    <nav className="mt-8 flex items-center justify-center gap-4">
      {hasPrevious ? (
        <Link
          href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
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
          href={`/?page=${currentPage + 1}`}
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
