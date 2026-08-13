import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/api";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border p-6">
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
              className="font-medium hover:underline"
            >
              {post.author.username}
            </Link>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{post.date_posted}</span>
          </div>

          {/* Driver */}
          <div className="my-3 border-t" />

          {/* Title */}
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {post.title}
            </h2>
          </Link>

          {/* Content */}
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {post.content.slice(0, 150)}
            {post.content.length > 150 && "..."}
          </p>
        </div>
      </div>
    </article>
  );
}
