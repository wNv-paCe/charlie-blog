import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types/post";
import PostActions from "./PostActions";

type PostDetailProps = {
  post: Post;
  isOwner: boolean;
};

export default function PostDetail({ post, isOwner }: PostDetailProps) {
  return (
    <article className="max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <Image
            src={post.author.image_path || "/default.jpg"}
            alt={post.author.username}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>

        {/* Post */}
        <div className="min-w-0 flex-1">
          {/* Author + date */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/users/${post.author.id}/posts`}
              className="font-semibold text-lg text-blue-500 hover:text-foreground"
            >
              {post.author.username}
            </Link>
            <span className="text-muted">·</span>
            <span className="text-muted">
              {new Date(post.date_posted).toLocaleDateString("en-CA")}
            </span>
          </div>

          {/* Driver */}
          <div className="mb-3 border-t border-border" />

          {/* Title + Actions */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="min-w-0 text-xl font-semibold text-card-foreground">
              {post.title}
            </h2>

            {isOwner && (
              <div className="self-end sm:self-auto">
                <PostActions postId={post.id} userId={post.user_id} />
              </div>
            )}
          </div>

          {/* Content */}
          <p className="mt-2 text-card-foreground wrap-break-word">
            {post.content}
          </p>
        </div>
      </div>
    </article>
  );
}
