import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/api";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6">
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
              className="font-semibold text-lg text-blue-700 hover:text-foreground"
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

          {/* Title */}
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold text-card-foreground hover:text-primary">
              {post.title}
            </h2>
          </Link>

          {/* Content */}
          <p className="mt-2 text-card-foreground">
            {post.content.slice(0, 150)}
            {post.content.length > 150 && "..."}
          </p>
        </div>
      </div>
    </article>
  );
}
