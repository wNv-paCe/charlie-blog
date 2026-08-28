import { Comment } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

type CommentListProps = {
  comments: Comment[];
  postAuthorId: number;
};

export default function CommentList({
  comments,
  postAuthorId,
}: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-muted">No comments yet.</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        const isAuthor = comment.user?.id === postAuthorId;

        return (
          <article key={comment.id} className="flex gap-3">
            <div className="shrink-0">
              <Image
                src={comment.user?.image_path || "/default.jpg"}
                alt={comment.user?.username || "Deleted user"}
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm">
                {comment.user ? (
                  <Link
                    href={`/users/${comment.user.id}/posts`}
                    className="font-semibold hover:text-blue-500"
                  >
                    {comment.user.username}
                  </Link>
                ) : (
                  <span className="font-semibold text-muted">Deleted user</span>
                )}

                {isAuthor && <span className="text-xs text-muted">Author</span>}

                <span className="text-muted">·</span>

                <span className="text-muted">
                  {new Date(comment.created_at).toLocaleDateString("en-CA")}
                </span>
              </div>

              <p className="mt-1 wrap-break-word text-card-foreground">
                {comment.content}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
